import NewJobForm from "@/components/jobs/new-job-form";
import styles from "../../components/jobs/new-job-form.module.css";
import ProtectedRoute from "@/components/nav/protected-route";

export default async function NewJobPage() {
  return (
    <ProtectedRoute>
      <main>
        <NewJobForm />
      </main>
    </ProtectedRoute>
  );
}
