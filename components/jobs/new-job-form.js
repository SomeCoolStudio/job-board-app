"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { jobInitialStateSchema, jobSubmissionSchema } from "@/lib/schemas";
import styles from "./new-job-form.module.css";
import JobFormInputFields from "./job-form-input-fields";
import { validateField } from "@/utils/validate-field";
import TagList from "./tag-list";
import NextButton from "./next-button";
import JobFormTextAreaFields from "./job-form-text-area-fields";
import JobFormMultipleFields from "./job-form-multiple-fields";
import JobFormSubmit from "./job-form-submit";

// Derive the initial state from the lenient schema.
const initialState = jobInitialStateSchema.parse({});

export default function NewJobForm() {
  // Single state for all input values.
  const [formData, setFormData] = useState(initialState);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Step counter for the multi-step form
  const [step, setStep] = useState(1);

  // Generic change handler for any field.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to open the file dialog by clicking the hidden file input.
  const openFileDialog = () => {
    const fileInput = document.getElementById("imageInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  // onChange handler specifically for the file input.
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imagePreview: reader.result, // this will be a base64 string
          isValidImage: true,
          imageFile: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler to advance to the next step.
  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleToggleTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter((t) => t !== tag)
        : [...prev.selectedTags, tag],
    }));
  };

  // On submit, validate and send data.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate using the strict submission schema.
    const result = jobSubmissionSchema.safeParse(formData);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      const errorMsg =
        errors.jobTitle?.[0] ||
        errors.jobLocation?.[0] ||
        errors.studioName?.[0] ||
        "Validation error";
      setResponseMessage(errorMsg);
      setIsLoading(false);
      return;
    }

    // Build FormData object from formData.
    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        fd.append(key, JSON.stringify(value));
      } else {
        fd.append(key, value);
      }
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    // Send POST request to the API endpoint.
    const res = await fetch(`${baseUrl}/api/jobs/job`, {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    // console.log("Server response:", data);
    setResponseMessage(data.message);
    setIsLoading(false);
    if (data.success) {
      router.push("/"); // Navigates to home
      // Reset form and steps on success.
      setFormData(initialState);
      setStep(1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {/* Studio/Name Step */}
      <div className={step === 1 ? styles["first-text"] : styles["text-exit"]}>
        <JobFormInputFields
          id="studioName"
          name="studioName"
          label="Studio / Name"
          value={formData.studioName}
          onChange={handleChange}
          placeholder="Your Name or Studio..."
          isValid={validateField("studioName", formData.studioName)}
          onClick={handleNextStep}
        />
      </div>

      {/* Job Title Step */}
      <div
        className={
          step === 2
            ? styles["text"]
            : step < 2
              ? styles.hidden
              : styles["text-exit"]
        }
      >
        <JobFormInputFields
          id="jobTitle"
          name="jobTitle"
          label="Job Title"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="Name of Position Being Filled..."
          isValid={validateField("jobTitle", formData.jobTitle)}
          onClick={handleNextStep}
        />
      </div>

      {/* Job Location Step */}
      <div
        className={
          step === 3
            ? styles["text"]
            : step < 3
              ? styles.hidden
              : styles["text-exit"]
        }
      >
        <JobFormInputFields
          id="jobLocation"
          name="jobLocation"
          label="Job Location"
          value={formData.jobLocation}
          onChange={handleChange}
          placeholder="City, State or Anywhere (i.e., Remote)..."
          isValid={validateField("jobLocation", formData.jobLocation)}
          onClick={handleNextStep}
        />
      </div>

      {/* Tags Step */}
      <div
        className={
          step === 4
            ? styles["text"]
            : step < 4
              ? styles.hidden
              : styles["text-exit"]
        }
      >
        <h3>Select Job Tags</h3>
        <div>
          <TagList
            selectedTags={formData.selectedTags}
            onToggleTag={handleToggleTag}
          />
        </div>
        {formData.selectedTags.length > 0 && (
          <p>Selected Tags: {formData.selectedTags.join(", ")}</p>
        )}
        <NextButton
          id="selectedTagsNext"
          onClick={handleNextStep}
          isValid={formData.selectedTags.length > 0}
        />
      </div>

      {/* Job Salary Step */}
      <div
        className={
          step === 5
            ? styles["text"]
            : step < 5
              ? styles.hidden
              : styles["text-exit"]
        }
      >
        <JobFormInputFields
          id="jobSalary"
          name="jobSalary"
          label="Job Salary"
          value={formData.jobSalary}
          onChange={handleChange}
          placeholder="$100k"
          isValid={validateField("jobSalary", formData.jobSalary)}
          onClick={handleNextStep}
        />
      </div>

      {/* Image Upload Step */}
      <div
        className={
          step === 6
            ? styles["text"]
            : step < 6
              ? styles.hidden
              : styles["text-exit"]
        }
      >
        <label htmlFor="imageInput">64 x 64 PNG</label>
        <div>
          <button
            type="button"
            onClick={openFileDialog}
            className={styles["file-upload-button"]}
          >
            Upload Img
          </button>
          <input
            type="file"
            id="imageInput"
            name="imagePreview"
            onChange={handleImageChange}
            accept="image/png"
            className={styles.hidden}
          />
        </div>
        {formData.imagePreview && (
          <div className={styles.previewContainer}>
            <img
              src={formData.imagePreview}
              alt="Image Preview"
              className={styles.previewImage}
            />
          </div>
        )}
        <NextButton
          id="imageNext"
          onClick={handleNextStep}
          isValid={formData.isValidImage}
        />
      </div>

      {/* Studio Intro Step */}
      <div
        className={
          step === 7
            ? styles["bigger-text"]
            : step < 7
              ? styles.hidden
              : styles["text-exit"]
        }
      >
        <JobFormTextAreaFields
          id="studioIntro"
          name="studioIntro"
          label="Studio Intro"
          value={formData.studioIntro}
          onChange={handleChange}
          placeholder="We were founded in 2012. We’re a small but scrappy team working on our 3rd game..."
          isValid={validateField("studioIntro", formData.studioIntro)}
          onClick={handleNextStep}
        />
      </div>

      {/* Job Qualifications Step */}
      <div
        className={
          step === 8
            ? styles["text"]
            : step < 8
              ? styles.hidden
              : styles["text-exit"]
        }
      >
        <JobFormMultipleFields
          idOne="jobQualification"
          idTwo="jobQualificationTwo"
          idThree="jobQualificationThree"
          nameOne="jobQualification"
          nameTwo="jobQualificationTwo"
          nameThree="jobQualificationThree"
          label="Qualifications / Responsibilities"
          valueOne={formData.jobQualification}
          valueTwo={formData.jobQualificationTwo}
          valueThree={formData.jobQualificationThree}
          onChange={handleChange}
          placeholder="List first qualification here."
          placeholderTwo="List second qualification here."
          placeholderThree="List third qualification here."
          onClick={handleNextStep}
        />
      </div>

      {/* Job Benefits Step */}
      <div
        className={
          step === 9
            ? styles["text"]
            : step < 9
              ? styles.hidden
              : styles["text-exit"]
        }
      >
        <JobFormMultipleFields
          idOne="jobBenefit"
          idTwo="jobBenefitTwo"
          idThree="jobBenefitThree"
          nameOne="jobBenefit"
          nameTwo="jobBenefitTwo"
          nameThree="jobBenefitThree"
          label="Job Benefits"
          valueOne={formData.jobBenefit}
          valueTwo={formData.jobBenefitTwo}
          valueThree={formData.jobBenefitThree}
          onChange={handleChange}
          placeholder="List first benefit here."
          placeholderTwo="List second benefit here."
          placeholderThree="List third benefit here."
          onClick={handleNextStep}
        />
      </div>

      {/* Additional Details Step */}
      <div
        className={
          step === 10
            ? styles["text"]
            : step < 10
              ? styles.hidden
              : styles["text-exit"]
        }
      >
        <JobFormTextAreaFields
          id="extraJobDetails"
          name="extraJobDetails"
          label="Additional Details"
          value={formData.extraJobDetails}
          onChange={handleChange}
          placeholder="We are looking for a programming generalist, who shares our passion for making innovative role-playing games..."
          isValid={validateField("extraJobDetails", formData.extraJobDetails)}
          onClick={handleNextStep}
        />
      </div>

      {/* Job Email Step */}
      <div
        className={
          step === 11
            ? styles["text"]
            : step < 11
              ? styles.hidden
              : styles["text-exit"]
        }
      >
        <JobFormInputFields
          id="email"
          name="email"
          label="Job Email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email that applicant will send resume to..."
          isValid={validateField("email", formData.email)}
          onClick={handleNextStep}
        />
      </div>

      <div
        className={
          step === 12
            ? styles["text"]
            : step < 12
              ? styles.hidden
              : styles["text-exit"]
        }
      >
        <JobFormSubmit isLoading={isLoading} />
      </div>
    </form>
  );
}
