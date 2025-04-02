import Link from "next/link";
import JobItem from "./job-item";
import styles from "./job-list.module.css";

export default function JobList({ jobs }) {
  return (
    <ul className={styles["light-gray-bg"]}>
      {jobs.map((job) => (
        <li key={job._id.toString()}>
          <a
            className={styles["no-cursor"]}
            href={`/jobs/${job._id.toString()}`}
          >
            <JobItem
              id={job._id.toString()}
              imagePreview={job.imagePreview}
              studioName={job.studioName}
              firstPartDescription={job.firstPartDescription}
              jobTitle={job.jobTitle}
              secondPartDescription={job.secondPartDescription}
              jobLocation={job.jobLocation}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
