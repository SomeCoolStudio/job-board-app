"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to login, optionally with a return URL so the user can come back after logging in
      router.push("/api/auth/login?returnTo=/new-job");
    }
  }, [user, isLoading, router]);

  // Optionally display a loading indicator while authentication state is being determined
  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  return children;
}
