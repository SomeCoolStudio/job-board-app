import styles from "./new-job-form.module.css";
import NextButton from "./next-button";

export default function JobFormMultipleFields({
  idOne,
  idTwo,
  idThree,
  nameOne,
  nameTwo,
  nameThree,
  label,
  valueOne,
  valueTwo,
  valueThree,
  onChange,
  placeholder,
  placeholderTwo,
  placeholderThree,
  onClick,
}) {
  let isValid = valueOne && valueTwo && valueThree;

  return (
    <div>
      <label htmlFor={idOne}>{label}</label>
      <div>
        <input
          type="text"
          required
          id={idOne}
          name={nameOne}
          value={valueOne}
          onChange={onChange}
          placeholder={placeholder}
          className={styles["input-field"]}
        />
      </div>
      <div>
        <input
          type="text"
          required
          id={idTwo}
          name={nameTwo}
          value={valueTwo}
          onChange={onChange}
          placeholder={placeholderTwo}
          className={styles["input-field"]}
        />
      </div>
      <div>
        <input
          type="text"
          required
          id={idThree}
          name={nameThree}
          value={valueThree}
          onChange={onChange}
          placeholder={placeholderThree}
          className={styles["input-field"]}
        />
      </div>
      <div>
        <NextButton id={idOne} onClick={onClick} isValid={isValid} />
      </div>
    </div>
  );
}
