import NewJobForm from "@/components/jobs/new-job-form";
import styles from "../../components/jobs/new-job-form.module.css";

export default async function NewJobPage() {
  return (
    <main>
      <section className={styles.filler}></section>
      <NewJobForm />
      <section className={styles.filler}></section>
    </main>
  );
}
