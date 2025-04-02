"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./nav.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function NavBar() {
  const router = useRouter();
  const { user } = useUser();
  return (
    <nav>
      <ul className={styles.container}>
        <li className={styles.items}>
          <a href="/">Home</a>
        </li>
        <li className={styles.items}>
          <a href="/">About Us</a>
        </li>
        <li className={styles["login-logout"]}>
          {user ? (
            <a href="/api/auth/logout">Logout</a>
          ) : (
            <a href="/api/auth/login">Login</a>
          )}
        </li>
        <li className={styles["button-item"]}>
          <button
            className={styles.button}
            onClick={() => {
              router.push("/new-job");
            }}
          >
            Post Job
          </button>
        </li>
      </ul>
    </nav>
  );
}
