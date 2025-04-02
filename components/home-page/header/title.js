import Link from "next/link";
import NavBar from "../../nav/nav-bar";
import styles from "./title.module.css";

export default function Title() {
  return (
    <main className={styles.container}>
      <section className={styles["left-item"]}>
        <a href="/">
          <h2 className={styles.title}>Ranked Dev Jobs</h2>
        </a>
      </section>
      <section className={styles["right-item"]}>
        <div className={styles["right-contents"]}>
          <NavBar />
        </div>
      </section>
    </main>
  );
}
