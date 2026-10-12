/**
 * Data contract for <QuotationTemplate /> (classic skin).
 *
 * Everything here is plain JSON-serializable data (strings, numbers, arrays) —
 * safe to fetch from an API route or a DB record and pass straight in as the
 * `data` prop. No React elements/icons are ever passed in; icons are resolved
 * internally from the string keys below (see icons.tsx).
 *
 * Text fields support a tiny inline markdown subset, parsed by <Rich/>:
 *   **bold text**   -> <strong>
 *   _italic text_   -> <em>
 *   a bare https:// URL as the whole line -> rendered as a link
 *
 * This is deliberately the same shape as the non-classic offbeat_template's
 * QuotationData (same field names throughout) plus a handful of additive
 * fields the classic layout needs (quotationDate, and PriceSummary.pax/rate)
 * — a CRM that already builds one can build the other with the same adapter
 * logic, just a couple of extra lines.
 */

export interface AgencyInfo {
  name: string;
  phone: string;
  email: string;
  website: string;
  /** Optional logo image URL. Falls back to a text wordmark when omitted. */
  logoUrl?: string;
}

export interface TripDetails {
  customerName: string;
  destination: string;
  /** e.g. "5N / 6D" */
  duration: string;
  /** e.g. "21 Oct 2026" */
  travelDate: string;
  /** e.g. "4 Adults" or "2 Adults, 1 Kid" */
  pax: string;
  /** e.g. "2 Rooms" */
  rooms: string;
  preparedBy: string;
}

export interface PriceSummary {
  /** e.g. "Per Adult" */
  perPersonLabel: string;
  /** Traveler count for the rate row, e.g. 4 */
  pax: number;
  /** Pre-formatted per-head rate, e.g. "₹10" */
  rate: string;
  /** Pre-formatted row amount (rate x pax), e.g. "₹40" */
  perPersonAmount: string;
  /** e.g. "Total Package Cost" */
  totalLabel: string;
  /** Pre-formatted, e.g. "₹40" */
  totalAmount: string;
}

/** Known service keys with a matching built-in icon. Unknown strings render with a generic icon. */
export type ServiceKey =
  | "Hotels"
  | "Tours"
  | "Transport"
  | "Flights"
  | "Activities"
  | "Meals"
  | "Guide"
  | (string & {});

export interface HotelStay {
  name: string;
  location: string;
  /** 1-5 */
  stars: number;
  nights: number;
  roomType: string;
  mealPlan: string;
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;
}

export interface ItineraryNote {
  heading: string;
  lines: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  location: string;
  /** e.g. "Wed, 21 Oct 2026" */
  date: string;
  bullets: string[];
  note?: ItineraryNote;
  italicNote?: string;
  /** e.g. "Shared Transfer" / "Private Transfer" */
  transferTag?: string;
  meals: string[];
}

export interface PolicyBlock {
  inclusions: string[];
  exclusions: string[];
  payment: string[];
  cancellation: string[];
  bookingTerms: string[];
}

export interface ThankYouBlock {
  heading: string;
  subheading: string;
  message: string;
  consultantName: string;
  consultantPhone: string;
  consultantEmail: string;
  website: string;
  /** Public shareable link to this quotation. */
  quotationUrl: string;
}

export interface QuotationData {
  quotationNumber: string;
  /** e.g. "12 Oct 2026" */
  quotationDate: string;
  heroImageUrl: string;
  /** Short pill label over the hero, e.g. "KERALA" */
  destinationTag: string;
  /** Main heading, e.g. "Kerala Package for Anudeep Reddy" */
  title: string;
  /** Combined duration | travel date | pax line under the hero title. */
  heroSummary: string;

  agency: AgencyInfo;
  trip: TripDetails;
  price: PriceSummary;
  servicesInclude: ServiceKey[];
  hotels: HotelStay[];
  itinerary: ItineraryDay[];
  policies: PolicyBlock;
  thankYou: ThankYouBlock;
}
