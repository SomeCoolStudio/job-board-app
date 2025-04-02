import Link from "next/link";
import styles from "./sign-up-button.module.css";

export default function SignUpButton() {
  return (
    <div className={styles.container}>
      <a href="/sign-up/job-seeker">
        <button className={styles["button--sign-up"]}>
          Send Me All The Jobs!
        </button>
      </a>
      <div className={styles.arrow}>{"\u{2192}"}</div>
    </div>
  );
}
