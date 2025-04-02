import Link from "next/link";
import styles from "./post-job-button.module.css";

export default function PostJobButton() {
  return (
    <a href="/new-job">
      <button className={styles["button--post-job"]}>Post A Job For $0</button>
    </a>
  );
}
