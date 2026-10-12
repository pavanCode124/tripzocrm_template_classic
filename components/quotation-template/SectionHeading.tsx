import styles from "./SectionHeading.module.css";

/**
 * Classic section heading: a short gold rule to the left of a serif navy
 * caps title — no icon tile (unlike the non-classic skin), matching every
 * section header in the reference PDF ("CLIENT & TRAVEL DETAILS", "HOTEL
 * DETAILS", "POLICIES & TERMS", ...).
 */
export function SectionHeading({ title }: { title: string }) {
  return (
    <div className={styles.wrap}>
      <span className={styles.bar} />
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
