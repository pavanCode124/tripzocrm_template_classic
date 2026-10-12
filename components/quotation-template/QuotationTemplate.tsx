import type { QuotationData } from "./types";
import { Hero } from "./Hero";
import { TripOverview } from "./TripOverview";
import { HotelDetails } from "./HotelDetails";
import { DayCard, RouteSummary } from "./Itinerary";
import { Policies } from "./Policies";
import { ThankYou } from "./ThankYou";
import { PrintButton } from "./PrintButton";
import { PrintPage } from "./PrintPage";
import { PrintPageSizer } from "./PrintPageSizer";
import styles from "./QuotationTemplate.module.css";

/**
 * Full Offbeat Compass "Classic" quotation template — cover, hotel details,
 * one page per itinerary day, policies, thank-you — each with the same
 * "CONTACT US" + page-number footer as the reference PDF.
 *
 * Every page is 210mm wide and exactly as tall as its own content (with a
 * 140mm floor), matching the reference PDF, whose pages are all 595pt wide
 * but range from 283pt to 958pt tall. <PrintPageSizer> turns those measured
 * heights into per-page `@page` rules, so what you see on screen is exactly
 * what prints — there is no separate continuous-scroll layout to drift out
 * of sync with the print output.
 *
 * Pass a `QuotationData` object (see ./types.ts) fetched from your CRM's
 * API/DB — nothing here is hardcoded to a specific trip.
 *
 * Self-contained: plain CSS Modules only, no Tailwind, no next/image, no
 * icon library dependency, no webfont download. Safe to copy this whole
 * folder into any Next.js (or plain React) app.
 */
export function QuotationTemplate({
  data,
  showPrintButton = true,
}: {
  data: QuotationData;
  /** Set false if the host page supplies its own print/export control. */
  showPrintButton?: boolean;
}) {
  const hasHotels = data.hotels.length > 0;
  const hasPolicies =
    data.policies.inclusions.length > 0 ||
    data.policies.exclusions.length > 0 ||
    data.policies.payment.length > 0 ||
    data.policies.cancellation.length > 0 ||
    data.policies.bookingTerms.length > 0;

  const totalPages =
    1 + // cover
    (hasHotels ? 1 : 0) +
    data.itinerary.length +
    (hasPolicies ? 1 : 0) +
    1; // thank-you

  let page = 1;
  const nextPage = () => page++;

  return (
    <div className={styles.root}>
      {showPrintButton && <PrintButton />}
      <PrintPageSizer />

      <PrintPage page={nextPage()} totalPages={totalPages} agency={data.agency}>
        <Hero
          agency={data.agency}
          quotationNumber={data.quotationNumber}
          quotationDate={data.quotationDate}
          heroImageUrl={data.heroImageUrl}
          destinationTag={data.destinationTag}
          title={data.title}
          heroSummary={data.heroSummary}
          servicesInclude={data.servicesInclude}
        />
        <TripOverview trip={data.trip} price={data.price} />
      </PrintPage>

      {hasHotels && (
        <PrintPage page={nextPage()} totalPages={totalPages} agency={data.agency}>
          <HotelDetails hotels={data.hotels} />
        </PrintPage>
      )}

      {data.itinerary.map((day, i) => (
        <PrintPage key={day.day} page={nextPage()} totalPages={totalPages} agency={data.agency}>
          {i === 0 && <RouteSummary itinerary={data.itinerary} />}
          <DayCard day={day} />
        </PrintPage>
      ))}

      {hasPolicies && (
        <PrintPage page={nextPage()} totalPages={totalPages} agency={data.agency}>
          <Policies policies={data.policies} />
        </PrintPage>
      )}

      <PrintPage page={nextPage()} totalPages={totalPages} agency={data.agency}>
        <ThankYou thankYou={data.thankYou} />
      </PrintPage>
    </div>
  );
}

export type { QuotationData } from "./types";
