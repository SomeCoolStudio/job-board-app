"use client";
import styles from "./tag-list.module.css";

const availableTags = [
  "Remote",
  "On-site",
  "Hybrid",
  "Contract",
  "Full-time",
  "Part-time",
  "Art & Animation",
  "Audio",
  "Business & Operations",
  "Design",
  "Marketing & Community",
  "Production",
  "Programming",
  "QA & CS",
  "Writing",
];

export default function TagList({ selectedTags, onToggleTag }) {
  const handleTagClick = (tag, event) => {
    // console.log("Button className:", event.currentTarget.className);
    if (onToggleTag) {
      onToggleTag(tag);
    }
  };

  return (
    <div className={styles.container}>
      {availableTags.map((tag) => (
        <button
          key={tag}
          type="button"
          className={`${styles.button} ${
            selectedTags.includes(tag) ? styles.selected : ""
          }`}
          onClick={(e) => handleTagClick(tag, e)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
