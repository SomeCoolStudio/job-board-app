import styles from "./new-job-form.module.css";
import NextButton from "./next-button";

export default function JobFormInputFields({
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
        <input
          type="text"
          required
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles["input-field"]}
        />
      </div>
      <NextButton id={id} onClick={onClick} isValid={isValid} />
    </div>
  );
}
