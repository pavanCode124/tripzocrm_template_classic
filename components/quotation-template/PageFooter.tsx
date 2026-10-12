import type { AgencyInfo } from "./types";
import styles from "./PageFooter.module.css";

/** Repeats on every printed page — "CONTACT US" + the page number, exactly like the reference PDF. */
export function PageFooter({
  agency,
  page,
  totalPages,
}: {
  agency: AgencyInfo;
  page: number;
  totalPages: number;
}) {
  return (
    <div className={styles.footer}>
      <div>
        <p className={styles.contactLabel}>CONTACT US</p>
        <div className={styles.contactLines}>
          {agency.phone && <div>{agency.phone}</div>}
          {agency.email && <div>{agency.email}</div>}
          {agency.website && <div>{agency.website}</div>}
        </div>
      </div>
      <p className={styles.pageNumber}>
        Page {page}/{totalPages}
      </p>
    </div>
  );
}
