import styles from "./job-form-radio-button.module.css";
import NextButton from "./next-button";

export default function JobFormRadioButton({
  id,
  labelTitle,
  labelOne,
  labelTwo,
  labelThree,
  name,
  value,
  checkValue,
  checkValueTwo,
  checkValueThree,
  onChange,
  onClick,
}) {
  return (
    <div>
      {labelTitle}
      <label className={styles["radio-container"]}>
        {labelOne}
        <input
          type="radio"
          name={name}
          id={id}
          value={checkValue}
          checked={value === checkValue}
          onChange={onChange}
          required
        />
        <span className={styles.checkmark}></span>
      </label>

      <label className={styles["radio-container"]}>
        {labelTwo}
        <input
          type="radio"
          name={name}
          id={id}
          value={checkValueTwo}
          checked={value === checkValueTwo}
          onChange={onChange}
          required
        />
        <span className={styles.checkmark}></span>
      </label>

      <label className={styles["radio-container"]}>
        {labelThree}
        <input
          type="radio"
          name={name}
          id={id}
          value={checkValueThree}
          checked={value === checkValueThree}
          onChange={onChange}
          required
        />
        <span className={styles.checkmark}></span>
      </label>
      <NextButton id={id} onClick={onClick} isValid={value} />
    </div>
  );
}
