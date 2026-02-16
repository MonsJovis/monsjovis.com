import {
  http,
  type Request,
  type Response,
} from "@google-cloud/functions-framework";
import Anthropic from "@anthropic-ai/sdk";
import resume from "./resume.json" with { type: "json" };

const ALLOWED_ORIGINS = [
  "https://monsjovis.com",
  "https://www.monsjovis.com",
  "http://localhost:3000",
];

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const MAX_MESSAGE_LENGTH = 2_000;
const MAX_MESSAGES = 20;
const MODEL = "claude-sonnet-4-5-20250929";

const anthropic = new Anthropic();

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60_000);

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

function setCorsHeaders(res: Response, origin: string) {
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
  }
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "86400");
}

function buildSystemPrompt(): string {
  const { basics, work, education, skills, domains, projects, languages } =
    resume;

  const stripHtml = (s: string) => s.replace(/<[^>]+>/g, "");

  const workSection = work
    .map((job) => {
      const period = job.endDate
        ? `${job.startDate} – ${job.endDate}`
        : `${job.startDate} – present`;
      const highlights = job.highlights
        .map((h) => `  - ${stripHtml(h)}`)
        .join("\n");
      return `- ${job.name} | ${job.position} (${period})\n${highlights}`;
    })
    .join("\n");

  const eduSection = education
    .map((e) => `- ${e.studyType} ${e.area}, ${e.institution}`)
    .join("\n");

  const skillsSection = skills
    .map((s) => `- ${s.name}: ${s.keywords.join(", ")}`)
    .join("\n");

  const projectsSection = projects
    .map(
      (p) => `- ${p.name}${p.entity ? ` (${p.entity})` : ""}: ${p.description}`,
    )
    .join("\n");

  const langs = languages.map((l) => `${l.language} (${l.fluency})`).join(", ");

  const personalContext = process.env.PERSONAL_CONTEXT;

  const personalSection = personalContext
    ? `\n\nPersonal:\n${personalContext}`
    : "";

  const topicRule = personalContext
    ? `- Answer questions about ${basics.name}'s professional background, skills, projects, availability, and personal interests/hobbies`
    : `- Answer questions about ${basics.name}'s experience, skills, projects, and availability\n- Do not discuss topics unrelated to ${basics.name}'s professional background unless asked directly`;

  return `You are an AI assistant on the personal website of ${basics.name}, a ${basics.label} based in ${basics.location.city}.

About ${basics.name}:
${basics.summary}

Experience:
${workSection}

Education:
${eduSection}

Skills:
${skillsSection}

Domain experience: ${domains.join(", ")}

Projects:
${projectsSection}

Languages: ${langs}${personalSection}

Behavior rules:
- Be helpful, concise, and professional
${topicRule}
- Be conversational, not formal.
- If asked about availability: ${basics.name} is available for interim and consulting engagements
- For contact: direct them to ${basics.email}
- Keep responses under 150 words unless the user asks for detail
- If asked something you don't know about ${basics.name}, say so honestly
- Never make up information about ${basics.name}`;
}

const SYSTEM_PROMPT = buildSystemPrompt();

http("chat", async (req: Request, res: Response) => {
  const origin = req.headers.origin || "";
  setCorsHeaders(res, origin);

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const clientIp =
    req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
    req.ip ||
    "unknown";
  if (!checkRateLimit(clientIp)) {
    res
      .status(429)
      .json({ error: "Too many requests. Please try again in a minute." });
    return;
  }

  if (!req.body || typeof req.body !== "object") {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "Messages array is required" });
    return;
  }

  if (messages.length > MAX_MESSAGES) {
    res.status(400).json({ error: `Too many messages (max ${MAX_MESSAGES})` });
    return;
  }

  for (const msg of messages) {
    if (
      typeof msg !== "object" ||
      msg === null ||
      (msg.role !== "user" && msg.role !== "assistant") ||
      typeof msg.content !== "string" ||
      msg.content.length === 0 ||
      msg.content.length > MAX_MESSAGE_LENGTH
    ) {
      res.status(400).json({ error: "Invalid message format" });
      return;
    }
  }

  try {
    const stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    res.set("Content-Type", "text/event-stream");
    res.set("Cache-Control", "no-cache");
    res.set("Connection", "keep-alive");

    for await (const event of stream) {
      if (
        event.type === "content_block_delta" &&
        event.delta.type === "text_delta"
      ) {
        res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Anthropic API error:", message);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to generate response" });
    } else {
      res.write(`data: ${JSON.stringify({ error: "Stream interrupted" })}\n\n`);
      res.end();
    }
  }
});
