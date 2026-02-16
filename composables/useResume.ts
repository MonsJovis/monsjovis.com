import type { Resume } from "~/types/resume";
import resumeData from "~/resume.json";

const resume = resumeData as Resume;

export function useResume() {
  const basics = computed(() => resume.basics);
  const work = computed(() => resume.work);
  const projects = computed(() => resume.projects);
  const skills = computed(() => resume.skills);
  const domains = computed(() => resume.domains);
  const education = computed(() => resume.education);
  const languages = computed(() => resume.languages);
  const { city } = resume.basics.location;

  const firstSummaryLine = computed(
    () => resume.basics.summary.split("\n\n")[0],
  );

  const email = computed(() => resume.basics.email);

  const profiles = computed(() => resume.basics.profiles);

  return {
    basics,
    work,
    projects,
    skills,
    domains,
    education,
    languages,
    firstSummaryLine,
    city,
    email,
    profiles,
  };
}
