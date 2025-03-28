import styles from "./card.module.css";

export default function Card({ children }) {
  return (
    <div className={styles.container}>
      <button className={styles.card}>
        {children}
        <div className={styles["fake-learn-more-button"]}>Learn More</div>
      </button>
    </div>
  );
}
