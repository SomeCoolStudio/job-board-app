// Helper function to sanitize jobs data
export function sanitizeJobData(jobs) {
  return jobs.map((job) => ({
    _id: job._id?.toString() || "", // Ensure _id is a string
    imagePreview: job.imagePreview || "", // Default empty string if image is missing
    studioName: job.studioName || "Unknown Studio",
    firstPartDescription: job.firstPartDescription || "Unknown Title",
    jobTitle: job.jobTitle || "Unknown Title",
    secondPartDescription: job.secondPartDescription || "Unknown Title",
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
    email: job.email || "No contact email available.",
    selectedTags: Array.isArray(job.selectedTags) ? job.selectedTags : [], // Ensure tags is always an array
  }));
}
