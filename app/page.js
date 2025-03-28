// app/home/page.js
import HomeDescription from "@/components/home-page/home-description/home-description";
import HomeMiddleButtons from "@/components/home-page/home-buttons/home-middle-buttons";
import TagFilter from "@/components/jobs/tag-filter";
import { sanitizeJobData } from "@/lib/sanitize-job-data";

export default async function Home() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  // Use the baseUrl in an API call
  const res = await fetch(`${baseUrl}/api/jobs/job`);
  const json = await res.json();
  const jobs = json.success ? json.jobs : [];

  // Sanitize the jobs data before passing it to the client-side component
  const sanitizedJobs = sanitizeJobData(jobs);

  // Optionally log the jobs
  // console.log("Jobs fetched:", jobs);

  return (
    <main>
      <HomeDescription />
      <HomeMiddleButtons />
      <TagFilter jobs={sanitizedJobs} />
    </main>
  );
}
