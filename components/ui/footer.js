import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className={styles.container}>
        <ol className={`${styles["nav-bar"]}`}>
          <li className={styles["title-text"]}>Dev Ranked Jobs</li>
          <li>{"\u{24B8}"}</li>
          <li className={styles["title-text"]}>2025</li>
        </ol>
        <ul className={styles["nav-bar"]}>
          <Link href="/">
            <li className={styles["nav-items"]}>About</li>
          </Link>
          <Link href="/">
            <li className={styles["nav-items"]}>Terms</li>
          </Link>
          <Link href="/">
            <li className={styles["nav-items"]}>Privacy Policy</li>
          </Link>
        </ul>
      </div>
    </>
  );
}
