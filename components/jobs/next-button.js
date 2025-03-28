import styles from "./new-job-form.module.css";

export default function NextButton({ id, onClick, isValid }) {
  return (
    <div>
      <button
        type="button"
        id={id}
        disabled={!isValid}
        onClick={onClick}
        className={styles.button}
      >
        Next!
      </button>
    </div>
  );
}
