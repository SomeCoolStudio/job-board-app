import Image from "next/image";
import logo from "@/images/logo.png";
import styles from "./home-description.module.css";
import HomeMiddleButtons from "../home-buttons/home-middle-buttons";

export default function HomeDescription() {
  return (
    <>
      <section className={`${styles.container} ${styles["bg-image"]}`}>
        <div className={styles.box}>
          <h2 className={styles.title}>REAL JOBS, FOR REAL DEVS!</h2>
          <p className={styles.description}>
            Where you can find salaried jobs that are real and hiring!
          </p>
          <div className={styles.buttons}>
            <HomeMiddleButtons />
          </div>
        </div>
        <div className={styles["box-2"]}>
          <Image
            src={logo}
            className={styles.image}
            alt="cool image"
            priority
          />
        </div>
      </section>
    </>
  );
}
