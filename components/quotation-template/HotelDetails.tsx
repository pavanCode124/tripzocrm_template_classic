import type { HotelStay } from "./types";
import { StarIcon } from "./icons";
import { SectionHeading } from "./SectionHeading";
import styles from "./HotelDetails.module.css";
import shell from "./QuotationTemplate.module.css";

export function HotelDetails({ hotels }: { hotels: HotelStay[] }) {
  if (hotels.length === 0) return null;

  return (
    <section className={shell.section}>
      <SectionHeading title="Hotel Details" />
      <table className={shell.table}>
        <thead>
          <tr>
            <th>Hotel Name</th>
            <th>City</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Room Type</th>
            <th>Meal Plan</th>
            <th>Nights</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={`${hotel.name}-${hotel.checkInDate}`}>
              <td>
                <p className={styles.hotelName}>{hotel.name}</p>
                <div className={styles.stars}>
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <StarIcon key={i} width={10} height={10} />
                  ))}
                </div>
              </td>
              <td>
                <p className={styles.cityName}>{hotel.location.split(",")[0]}</p>
                <p className={styles.citySub}>India</p>
              </td>
              <td>
                <p className={styles.date}>{hotel.checkInDate}</p>
                <p className={styles.time}>{hotel.checkInTime}</p>
              </td>
              <td>
                <p className={styles.date}>{hotel.checkOutDate}</p>
                <p className={styles.time}>{hotel.checkOutTime}</p>
              </td>
              <td>{hotel.roomType}</td>
              <td>{hotel.mealPlan}</td>
              <td>{hotel.nights}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
