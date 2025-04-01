"use client";
import Link from "next/link";
import styles from "./nav.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function NavBar() {
  const { user } = useUser();
  return (
    <nav>
      <ul className={styles.container}>
        <li className={styles.items}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.items}>
          <Link href="/">About Us</Link>
        </li>
        <li className={styles["login-logout"]}>
          {user ? (
            <a href="/api/auth/logout">Logout</a>
          ) : (
            <a href="/api/auth/login">Login</a>
          )}
        </li>
        <li className={styles["button-item"]}>
          <a href="/new-job">
            <button className={styles.button}>Post Job</button>
          </a>
        </li>
      </ul>
    </nav>
  );
}
