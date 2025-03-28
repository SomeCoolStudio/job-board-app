// Helper function to sanitize jobs data
export function sanitizeJobData(jobs) {
  return jobs.map((job) => ({
    _id: job._id?.toString() || "", // Ensure _id is a string
    image: job.image || "", // Default empty string if image is missing
    studioName: job.studioName || "Unknown Studio",
    jobTitle: job.jobTitle || "Unknown Title",
    jobLocation: job.jobLocation || "Unknown Location",
    jobType: job.jobType || "Unknown Type",
    jobFlexibility: job.jobFlexibility || "Not Specified",
    jobSalary: job.jobSalary || "Salary Not Provided",
    studioIntro: job.studioIntro || "No introduction available.",
    jobQualification: job.jobQualification || "No qualifications listed.",
    jobQualificationTwo: job.jobQualificationTwo || "",
    jobQualificationThree: job.jobQualificationThree || "",
    jobBenefit: job.jobBenefit || "",
    jobBenefitTwo: job.jobBenefitTwo || "",
    jobBenefitThree: job.jobBenefitThree || "",
    extraJobDetails: job.extraJobDetails || "No extra details provided.",
    jobEmail: job.jobEmail || "No contact email available.",
    tags: Array.isArray(job.tags) ? job.tags : [], // Ensure tags is always an array
  }));
}
