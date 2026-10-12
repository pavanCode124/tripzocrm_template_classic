import type { ItineraryDay } from "./types";
import { Rich } from "./Rich";
import { SectionHeading } from "./SectionHeading";
import styles from "./Itinerary.module.css";

interface RouteStop {
  location: string;
  label: string;
}

interface RouteRun {
  location: string;
  firstDay: number;
  lastDay: number;
}

/**
 * Groups consecutive itinerary days that share the same `location` into
 * "Munnar (Days 1-2)" style stops, purely from fields already on
 * ItineraryDay — no extra data needed from the CRM. Matches the route
 * summary line above Day 1 in the reference PDF ("Munnar (Days 1-2) ->
 * Thekkady (Day 3) -> Alleppey (Day 4) -> Kovalam (Days 5-6)").
 */
export function buildRouteSummary(itinerary: ItineraryDay[]): RouteStop[] {
  const runs: RouteRun[] = [];
  for (const day of itinerary) {
    const location = day.location?.trim();
    if (!location) continue;
    const last = runs[runs.length - 1];
    if (last && last.location === location) {
      last.lastDay = day.day;
    } else {
      runs.push({ location, firstDay: day.day, lastDay: day.day });
    }
  }
  return runs.map((run) => ({
    location: run.location,
    label: run.firstDay === run.lastDay ? `Day ${run.firstDay}` : `Days ${run.firstDay}-${run.lastDay}`,
  }));
}

export function RouteSummary({ itinerary }: { itinerary: ItineraryDay[] }) {
  const stops = buildRouteSummary(itinerary);
  if (stops.length === 0) return null;

  return (
    <div>
      <SectionHeading title="Sightseeing and Experiences" />
      <p className={styles.route}>
        {stops.map((stop, i) => (
          <span key={i}>
            {i > 0 && <span className={styles.arrow}> &rarr; </span>}
            <span className={styles.routeLocation}>{stop.location}</span>{" "}
            <span className={styles.routeDays}>({stop.label})</span>
          </span>
        ))}
      </p>
    </div>
  );
}

/** One day's card — each one is rendered on its own <PrintPage/> by QuotationTemplate. */
export function DayCard({ day }: { day: ItineraryDay }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.dayBadge}>DAY {day.day}</span>
        <h3 className={styles.title}>{day.title}</h3>
        {day.date && <span className={styles.date}>{day.date}</span>}
      </div>

      <table className={styles.bodyTable}>
        <tbody>
          <tr>
            <td className={styles.label}>Location:</td>
            <td>{day.location}</td>
          </tr>
          <tr>
            <td className={styles.label}>Activities:</td>
            <td>
              <p className={styles.activityTitle}>{day.title}</p>
              <ul className={styles.bullets}>
                {day.bullets.map((b, i) => (
                  <li key={i}>
                    <Rich text={b} />
                  </li>
                ))}
              </ul>

              {day.note && (
                <div className={styles.note}>
                  <p className={styles.noteHeading}>{day.note.heading}</p>
                  <ul className={styles.bullets}>
                    {day.note.lines.map((line, i) => (
                      <li key={i}>
                        <Rich text={line} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {day.italicNote && <p className={styles.italicNote}>{day.italicNote}</p>}
            </td>
          </tr>
          <tr>
            <td className={styles.label}>Meals:</td>
            <td>{day.meals.join(", ") || "—"}</td>
          </tr>
          <tr>
            <td className={styles.label}>Transfer:</td>
            <td>{day.transferTag || "—"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
