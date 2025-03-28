import PostJobButton from "./post-job-button";
import SignUpButton from "./sign-up-button";
import styles from "./home-middle-buttons.module.css";

export default function HomeMiddleButtons() {
  return (
    <div className={`${styles.container} ${styles["bg-color"]}`}>
      <PostJobButton />
      <SignUpButton />
    </div>
  );
}
