import styles from "./new-job-form.module.css";
import NextButton from "./next-button";

export default function JobFormTextAreaFields({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  isValid,
  onClick,
}) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <textarea
          type="text"
          required
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles["text-area"]}
        />
      </div>
      <NextButton id={id} onClick={onClick} isValid={isValid} />
    </div>
  );
}
