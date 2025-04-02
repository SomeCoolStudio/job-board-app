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
            <Link href="/api/auth/logout">Logout</Link>
          ) : (
            <Link href="/api/auth/login">Login</Link>
          )}
        </li>
        <li className={styles["button-item"]}>
          <Link href="/new-job">
            <button className={styles.button}>Post Job</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
