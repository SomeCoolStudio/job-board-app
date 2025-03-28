import { z } from "zod";

// Schema for initial state – all fields default to an empty string.
export const jobSeekerInitialStateSchema = z.object({
  email: z.string().default(""),
  name: z.string().default(""),
  message: z.string().default(""),
});

// Schema for validation on submit – require nonempty email and name.
export const jobSeekerValidationSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .min(1, { message: "Email is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  message: z.string().default(""),
});

export const jobPosterSchema = z.object({
  email: z.string().email().default(""),
  name: z.string().min(1, "Name is required").default(""),
  // Optionally include additional fields
});

//Schema for initial state: every field has a default.
export const jobInitialStateSchema = z.object({
  firstPartDescription: z.string().default("is hiring a"),
  secondPartDescription: z.string().default("to work in/from"),
  jobTitle: z.string().default(""),
  jobLocation: z.string().default(""),
  studioName: z.string().default(""),
  jobSalary: z.string().default(""),
  imagePreview: z.string().default(""),
  studioIntro: z.string().default(""),
  jobQualification: z.string().default(""),
  jobQualificationTwo: z.string().default(""),
  jobQualificationThree: z.string().default(""),
  jobBenefit: z.string().default(""),
  jobBenefitTwo: z.string().default(""),
  jobBenefitThree: z.string().default(""),
  extraJobDetails: z.string().default(""),
  email: z.string().default(""),
  selectedTags: z.array(z.string()).default([]),
});

// Schema for submission: requires non-empty strings (and non-empty array for tags)
export const jobSubmissionSchema = z.object({
  firstPartDescription: z.literal("is hiring a"),
  secondPartDescription: z.literal("to work in/from"),
  jobTitle: z.string().min(1, { message: "Job Title is required" }),
  jobLocation: z.string().min(1, { message: "Job Location is required" }),
  studioName: z.string().min(1, { message: "Studio Name is required" }),
  jobSalary: z.string().min(1, { message: "Job Salary is required" }),
  imagePreview: z.string().min(1, { message: "Image is required" }),
  studioIntro: z.string().min(1, { message: "Studio Intro is required" }),
  jobQualification: z
    .string()
    .min(1, { message: "Job Qualification is required" }),
  jobQualificationTwo: z
    .string()
    .min(1, { message: "Job Qualification Two is required" }),
  jobQualificationThree: z
    .string()
    .min(1, { message: "Job Qualification Three is required" }),
  jobBenefit: z.string().min(1, { message: "Job Benefit is required" }),
  jobBenefitTwo: z.string().min(1, { message: "Job Benefit Two is required" }),
  jobBenefitThree: z
    .string()
    .min(1, { message: "Job Benefit Three is required" }),
  extraJobDetails: z
    .string()
    .min(1, { message: "Additional details are required" }),
  email: z.string().min(1, { message: "Job Email is required" }),
  selectedTags: z
    .array(z.string())
    .nonempty({ message: "At least one tag is required" }),
});
