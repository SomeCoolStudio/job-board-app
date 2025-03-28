import Link from "next/link";
import styles from "./job-home-button.module.css";

export default function JobHomeButton() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <button className={styles["job-home-button"]}>
          {"\u{2190} "}Back to all the Jobs!
        </button>
      </Link>
    </div>
  );
}
