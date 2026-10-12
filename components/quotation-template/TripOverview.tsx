import type { PriceSummary, TripDetails } from "./types";
import { SectionHeading } from "./SectionHeading";
import styles from "./TripOverview.module.css";
import shell from "./QuotationTemplate.module.css";

/** "5 Nights / 6 Days" -> "5N / 6D" — the compact form the reference PDF
 *  uses in this table (the hero banner keeps the full wording instead). */
function abbreviateDuration(duration: string): string {
  if (!duration) return duration;
  return duration.replace(/\s*nights?/gi, "N").replace(/\s*days?/gi, "D");
}

function Row({
  left,
  right,
}: {
  left: [string, string];
  right?: [string, string];
}) {
  return (
    <tr>
      <td className={styles.labelCell}>
        <p className={styles.label}>{left[0]}</p>
      </td>
      <td colSpan={right ? 1 : 3}>
        <p className={styles.value}>{left[1]}</p>
      </td>
      {right && (
        <>
          <td className={styles.labelCell}>
            <p className={styles.label}>{right[0]}</p>
          </td>
          <td>
            <p className={styles.value}>{right[1]}</p>
          </td>
        </>
      )}
    </tr>
  );
}

export function TripOverview({
  trip,
  price,
}: {
  trip: TripDetails;
  price: PriceSummary;
}) {
  return (
    <>
      <section className={shell.section}>
        <SectionHeading title="Client & Travel Details" />
        <table className={styles.detailsTable}>
          <tbody>
            <Row left={["Client Name", trip.customerName]} right={["Destination", trip.destination]} />
            <Row left={["Duration", abbreviateDuration(trip.duration)]} right={["Travel Date", trip.travelDate]} />
            <Row left={["Travelers", trip.pax]} right={["Rooms", trip.rooms]} />
            <Row left={["Consultant", trip.preparedBy]} />
          </tbody>
        </table>
      </section>

      <section className={shell.section}>
        <SectionHeading title="Package Pricing" />
        <table className={shell.table}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Pax / Travelers</th>
              <th style={{ textAlign: "right" }}>Rate</th>
              <th style={{ textAlign: "right" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{price.perPersonLabel}</td>
              <td>{price.pax}</td>
              <td style={{ textAlign: "right" }}>{price.rate}</td>
              <td style={{ textAlign: "right" }}>{price.perPersonAmount}</td>
            </tr>
            <tr className={shell.totalRow}>
              <td colSpan={3} style={{ textTransform: "uppercase" }}>
                {price.totalLabel}
              </td>
              <td style={{ textAlign: "right" }}>{price.totalAmount}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
