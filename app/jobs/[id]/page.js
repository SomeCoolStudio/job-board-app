import JobDetailsItem from "@/components/jobs/job-details-item";

export default async function JobDetail({ params }) {
  // Await the params object before destructuring
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = new URL(`/api/jobs/job/${id}`, baseUrl);

  // Use fetch with a cache option to disable caching:
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    return <p>Job not found.</p>;
  }
  const jobData = await res.json();
  if (!jobData.success || !jobData.job) {
    return <p>Job not found.</p>;
  }
  const job = jobData.job;

  return (
    <div>
      <JobDetailsItem
        imagePreview={job.imagePreview}
        jobTitle={job.jobTitle}
        studioName={job.studioName}
        jobPostDate={job.jobPostDate}
        jobType={job.selectedTags.find((tag) =>
          ["Contract", "Full-time", "Part-time"].includes(tag)
        )}
        jobFlexibility={job.selectedTags.find((tag) =>
          ["Remote", "On-site", "Hybrid"].includes(tag)
        )}
        jobSalary={job.jobSalary}
        studioIntro={job.studioIntro}
        jobQualification={job.jobQualification}
        jobQualificationTwo={job.jobQualificationTwo}
        jobQualificationThree={job.jobQualificationThree}
        jobBenefit={job.jobBenefit}
        jobBenefitTwo={job.jobBenefitTwo}
        jobBenefitThree={job.jobBenefitThree}
        extraJobDetails={job.extraJobDetails}
        email={job.email}
      />
    </div>
  );
}
