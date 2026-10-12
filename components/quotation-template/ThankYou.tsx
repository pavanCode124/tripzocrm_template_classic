import type { ThankYouBlock } from "./types";
import styles from "./ThankYou.module.css";

export function ThankYou({ thankYou }: { thankYou: ThankYouBlock }) {
  const contactLine = [thankYou.consultantName, thankYou.consultantPhone, thankYou.consultantEmail, thankYou.website]
    .filter(Boolean)
    .join(" | ");

  return (
    <div className={styles.box}>
      <h2 className={styles.heading}>{thankYou.heading || "Thank You for Choosing Us!"}</h2>
      <p className={styles.line}>{thankYou.subheading || "We look forward to making your travel dreams come true."}</p>
      <p className={styles.line}>For any queries, please contact your travel consultant.</p>
      {contactLine && <p className={styles.contact}>{contactLine}</p>}
    </div>
  );
}
