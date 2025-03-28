import styles from "./new-job-form.module.css";

export default function JobFormSubmit({ isLoading }) {
  return (
    <button
      type="submit"
      id="jobSubmitButton"
      disabled={isLoading}
      className={styles["post-job-button"]}
    >
      {isLoading ? "Submitting... 🚀" : "Submit Job 🎉"}
    </button>
  );
}
