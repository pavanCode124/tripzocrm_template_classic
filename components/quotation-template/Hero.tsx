import type { AgencyInfo, ServiceKey } from "./types";
import { CompassIcon, MapPinIcon, resolveServiceIcon } from "./icons";
import styles from "./Hero.module.css";
import shell from "./QuotationTemplate.module.css";

/**
 * Cover header + hero photo. Unlike the non-classic skin, the photo is
 * inset inside the page's normal margins (rounded corners, left/right gaps)
 * rather than bleeding to the page edges — matching the reference PDF,
 * where the banner sits below a plain letterhead-style header row.
 */
export function Hero({
  agency,
  quotationNumber,
  quotationDate,
  heroImageUrl,
  destinationTag,
  title,
  heroSummary,
  servicesInclude,
}: {
  agency: AgencyInfo;
  quotationNumber: string;
  quotationDate: string;
  heroImageUrl: string;
  destinationTag: string;
  title: string;
  heroSummary: string;
  servicesInclude: ServiceKey[];
}) {
  return (
    <div className={shell.section}>
      <div className={styles.letterhead}>
        <div className={styles.logo}>
          {agency.logoUrl ? (
            <img src={agency.logoUrl} alt={agency.name} className={styles.logoImage} />
          ) : (
            <CompassIcon width={34} height={34} style={{ color: "var(--qt-navy)" }} />
          )}
          <span className={styles.logoText}>{agency.name}</span>
        </div>
        <div className={styles.meta}>
          <p className={styles.metaTitle}>Travel Quotation</p>
          <p className={styles.metaLine}>Quotation No. #{quotationNumber}</p>
          <p className={styles.metaLine}>Date: {quotationDate}</p>
        </div>
      </div>

      <div className={styles.goldRule} />

      <div className={styles.hero}>
        <img className={styles.image} src={heroImageUrl} alt={title} />
        <div className={styles.gradient} />
        <div className={styles.caption}>
          <p className={styles.tag}>
            <MapPinIcon width={12} height={12} />
            {destinationTag}
          </p>
          <h1 className={styles.title}>{title}</h1>
          {heroSummary && <p className={styles.subtitle}>{heroSummary}</p>}
        </div>
      </div>

      {servicesInclude.length > 0 && (
        <div className={styles.servicesRow}>
          <span className={styles.servicesLabel}>SERVICES INCLUDE:</span>
          {servicesInclude.map((service) => {
            const Icon = resolveServiceIcon(service);
            return (
              <span key={service} className={styles.serviceItem}>
                <Icon width={14} height={14} />
                {service}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
