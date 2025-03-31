import { format } from "date-fns";
import styles from "./job-details-item.module.css";
import styles2 from "./share-button.module.css";
import JobHomeButton from "./job-home-button";
import ShareButton from "./share-button";

export default function JobDetailsItem({
  imagePreview,
  jobTitle,
  studioName,
  jobPostDate, // This should now be an ISO string
  jobType,
  jobFlexibility,
  jobSalary,
  studioIntro,
  jobQualification,
  jobQualificationTwo,
  jobQualificationThree,
  jobBenefit,
  jobBenefitTwo,
  jobBenefitThree,
  extraJobDetails,
  email,
}) {
  // Convert the ISO string to a Date object.
  const date = new Date(jobPostDate);

  // Check for an invalid date.
  const formattedDate = !isNaN(date.getTime())
    ? format(date, "MMMM dd, yyyy")
    : "Unknown date";

  return (
    <main className={styles.container}>
      <div className={styles["gray-banner-with-pseudo"]}>
        <JobHomeButton />
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Job Poster Logo"
            className={styles["logo-image"]}
          />
        ) : (
          <p>No image available</p>
        )}
        <header className={styles["job-title"]}>{jobTitle}</header>
        <div className={styles["horizontal-line"]}></div>
        <div className={styles["studio-name"]}>{studioName}</div>
        <div>
          <a href={`mailto:${email}`}>
            <button className={styles["email-button"]}>
              Apply to this Job
            </button>
          </a>
          <ShareButton styling={styles2["share-button"]} />
        </div>
      </div>
      <p className={styles["post-date"]}>Posted {formattedDate}</p>
      <div className={styles["small-details-container"]}>
        <p>{jobType}</p>
        <p>{jobFlexibility}</p>
        <p>{jobSalary}</p>
      </div>
      <p className={styles["intro-paragraph"]}>{studioIntro}</p>
      <header className={styles["middle-headers"]}>
        Qualifications / Requirements
      </header>
      <ul className={styles["bullet-list"]}>
        <li>{jobQualification}</li>
        <li>{jobQualificationTwo}</li>
        <li>{jobQualificationThree}</li>
      </ul>
      <header className={styles["middle-headers"]}>Benefits</header>
      <ul className={styles["bullet-list"]}>
        <li>{jobBenefit}</li>
        <li>{jobBenefitTwo}</li>
        <li>{jobBenefitThree}</li>
      </ul>
      <header className={styles["addional-info-header"]}>
        Additional Info
      </header>
      <p className={styles["addtional-info-paragraphs"]}>{extraJobDetails}</p>
      <div className={styles["bottom-email-share-container"]}>
        <a href={`mailto:${email}`}>
          <button className={styles["bottom-email-button"]}>
            Apply to this Job
          </button>
        </a>
        <ShareButton styling={styles2["bottom-share-button"]} />
      </div>
    </main>
  );
}
