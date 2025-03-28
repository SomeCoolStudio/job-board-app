// app/home/page.js
import HomeDescription from "@/components/home-page/home-description/home-description";
import HomeMiddleButtons from "@/components/home-page/home-buttons/home-middle-buttons";
import TagFilter from "@/components/jobs/tag-filter";
// import { sanitizeJobData } from "@/lib/sanitize-job-data";

export default async function Home() {
  // Fetch jobs from your API route.
  const res = await fetch("/api/jobs/job", {
    cache: "no-store",
  });
  const json = await res.json();
  const jobs = json.success ? json.jobs : [];

  // Optionally, we can sanitize or transform the jobs data
  // For example, you might call a function like sanitizeJobData(jobs)
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
