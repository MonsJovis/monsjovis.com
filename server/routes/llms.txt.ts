import resume from '../../resume.json'
import { services } from '../../lib/services'

// /llms.txt: the page as Markdown for AI systems (llmstxt.org), built from the same data as the page
// and prerendered by nuxt generate, so it can never drift from the site

const md = (html: string) => html.replace(/<\/?strong>/g, '**').replace(/<[^>]+>/g, '')

const period = (start: string, end?: string) => `${start} to ${end || 'present'}`

export default defineEventHandler((event) => {
  const { basics, work, projects, skills, domains, education, languages } = resume
  const [lead, ...rest] = basics.summary.split('\n\n')

  const lines = [
    `# ${basics.name}`,
    '',
    `> ${basics.label}. ${lead}`,
    '',
    ...rest.flatMap(p => [p, '']),
    `Based in ${basics.location.city}. Contact: ${basics.email}. Website: ${basics.url}`,
    '',
    '## What I do',
    '',
    ...services.map(s => `- **${s.title}:** ${s.description}`),
    '',
    '## Experience',
    '',
    ...work.flatMap(w => [
      `### ${w.position}, ${w.name} (${period(w.startDate, w.endDate)})`,
      '',
      ...(w.summary ? [md(w.summary), ''] : []),
      ...(w.highlights ?? []).map(h => `- ${md(h)}`),
      '',
    ]),
    '## Projects',
    '',
    ...projects.map(p => `- **${p.name}**${p.url ? ` (${p.url})` : ''}: ${md(p.description)}`),
    '',
    '## Skills',
    '',
    ...skills.map(s => `- **${s.name}:** ${s.keywords.join(', ')}`),
    `- **Industries:** ${domains.join(', ')}`,
    '',
    '## Education',
    '',
    ...education.map(e => `- ${e.studyType}, ${e.area}, ${e.institution} (${period(e.startDate, e.endDate)})`),
    '',
    '## Languages',
    '',
    ...languages.map(l => `- ${l.language}: ${l.fluency}`),
    '',
    '## Links',
    '',
    ...basics.profiles.map(p => `- [${p.network}](${p.url})`),
    '',
  ]

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return lines.join('\n')
})
