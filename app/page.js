// app/home/page.js
import HomeDescription from "@/components/home-page/home-description/home-description";
import HomeMiddleButtons from "@/components/home-page/home-buttons/home-middle-buttons";
import TagFilter from "@/components/jobs/tag-filter";
import { sanitizeJobData } from "@/lib/sanitize-job-data";

export default async function Home() {
  const res = await fetch(`https://job-board-app.vercel.app/api/jobs/job`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API returned an error: ${errorText}`);
  }

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
