import styles from "./job-item.module.css";
import Card from "../ui/card";

export default function JobItem({
  imagePreview,
  studioName,
  firstPartDescription,
  jobTitle,
  secondPartDescription,
  jobLocation,
}) {
  return (
    <Card>
      <div>
        <img
          src={imagePreview}
          alt="Job Poster Logo"
          className={styles["image-logo"]}
        />
      </div>
      <section className={styles["text-line"]}>
        <div className={styles["studio-name"]}>
          <p>{studioName}</p>
        </div>
        <div className={styles["first-part-text-box"]}>
          <p>{firstPartDescription}</p>
        </div>
        <div className={styles["job-title"]}>
          <p>{jobTitle}</p>
        </div>
        <div className={styles["second-part-text-box"]}>
          <p>{secondPartDescription}</p>
        </div>
        <div className={styles["job-location"]}>
          <p>{jobLocation}</p>
        </div>
        <div className={styles["shortened-text"]}>
          <p>{`${jobTitle} | ${jobLocation}`} </p>
        </div>
        <div className={styles["really-shortened-text"]}>
          <p>{jobTitle} </p>
          <p>{jobLocation} </p>
        </div>
      </section>
    </Card>
  );
}
