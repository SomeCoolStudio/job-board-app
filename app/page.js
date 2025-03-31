// app/home/page.js
import HomeDescription from "@/components/home-page/home-description/home-description";
import HomeMiddleButtons from "@/components/home-page/home-buttons/home-middle-buttons";
import TagFilter from "@/components/jobs/tag-filter";
import { sanitizeJobData } from "@/lib/sanitize-job-data";

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // Construct the API endpoint using the helper.
  const res = await fetch(`${baseUrl}/api/jobs/job`);

  // if (!res.ok) {
  //   const errorText = await res.text();
  //   throw new Error(`API returned an error: ${errorText}`);
  // }

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

      <TagFilter jobs={sanitizedJobs} />
    </main>
  );
}
