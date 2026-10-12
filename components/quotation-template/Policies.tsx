import type { PolicyBlock } from "./types";
import { BanIcon, CheckCircleIcon, CreditCardIcon, FileTextIcon, XCircleIcon } from "./icons";
import { Rich } from "./Rich";
import { SectionHeading } from "./SectionHeading";
import styles from "./Policies.module.css";
import shell from "./QuotationTemplate.module.css";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item, i) => (
        <li key={i}>
          <Rich text={item} />
        </li>
      ))}
    </ul>
  );
}

function Box({
  icon: Icon,
  iconClass,
  title,
  children,
}: {
  icon: typeof CheckCircleIcon;
  iconClass?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.box}>
      <div className={styles.boxHead}>
        <Icon width={16} height={16} className={iconClass} />
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}

export function Policies({ policies }: { policies: PolicyBlock }) {
  const hasAny =
    policies.inclusions.length ||
    policies.exclusions.length ||
    policies.payment.length ||
    policies.cancellation.length ||
    policies.bookingTerms.length;
  if (!hasAny) return null;

  return (
    <section className={shell.section}>
      <SectionHeading title="Policies & Terms" />
      <div className={styles.stack}>
        {policies.inclusions.length > 0 && (
          <Box icon={CheckCircleIcon} iconClass={styles.good} title="Inclusions">
            <BulletList items={policies.inclusions} />
          </Box>
        )}

        {policies.exclusions.length > 0 && (
          <Box icon={XCircleIcon} iconClass={styles.bad} title="Exclusions">
            <BulletList items={policies.exclusions} />
          </Box>
        )}

        {policies.payment.length > 0 && (
          <Box icon={CreditCardIcon} iconClass={styles.info} title="Payment Policies">
            <div className={styles.paragraphs}>
              {policies.payment.map((p, i) => (
                <p key={i}>
                  <Rich text={p} />
                </p>
              ))}
            </div>
          </Box>
        )}

        {policies.cancellation.length > 0 && (
          <Box icon={BanIcon} iconClass={styles.bad} title="Cancellation Policies">
            <BulletList items={policies.cancellation} />
          </Box>
        )}

        {policies.bookingTerms.length > 0 && (
          <Box icon={FileTextIcon} title="Booking Terms">
            <BulletList items={policies.bookingTerms} />
          </Box>
        )}
      </div>
    </section>
  );
}
