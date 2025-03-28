"use client";
import { useState } from "react";
import { validateField } from "@/utils/validate-field";
import {
  jobSeekerInitialStateSchema,
  jobSeekerValidationSchema,
} from "@/lib/schemas";
import styles from "./job-seeker-form.module.css";

// Derive initial state from your schema defaults.
const initialState = jobSeekerInitialStateSchema.parse({});

export default function NewJobSeekerForm() {
  // Use the schema-derived initial state
  const [formData, setFormData] = useState(initialState);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Update formData on every change using the spread operator.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // On submit, validate and send data.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Validate the form data using the Zod schema.
    const result = jobSeekerValidationSchema.safeParse(formData);
    if (!result.success) {
      // Flatten errors and display the first error message.
      const errors = result.error.flatten().fieldErrors;
      const errorMsg =
        errors.email?.[0] || errors.name?.[0] || "Validation error";
      setResponseMessage(errorMsg);
      return;
    }

    // Create FormData manually from formData.
    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, value);
    });

    // Send a POST request to your API route (assume it's at /api/users/job-seeker)
    const res = await fetch("/api/users/job-seeker", {
      method: "POST",
      body: fd,
    });
    const data = await res.json();
    setResponseMessage("🎉" + data.message + "🎉");
    setIsLoading(false);
    console.log("Server response:", data);

    if (data.success) {
      setFormData(initialState);
    }
  };

  console.log("formData:", formData);

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1>Sign-Up for Emails!</h1>
      <div className={styles["email-container"]}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your email..."
          value={formData.email}
          onChange={handleChange}
          className={styles["input-fields"]}
          required
        />
      </div>
      <div className={styles["name-container"]}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your name so we can properly say Hi!"
          value={formData.name}
          onChange={handleChange}
          className={styles["input-fields"]}
          required
        />
      </div>
      <button
        type="submit"
        className={styles["submit-button"]}
        disabled={
          !validateField("email", formData.email) ||
          !validateField("name", formData.name) ||
          isLoading
        }
      >
        {isLoading ? "Submitting..." : "Send'em here!"}
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
