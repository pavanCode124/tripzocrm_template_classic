import type {
  HotelStay,
  ItineraryDay,
  PolicyBlock,
  QuotationData,
  ServiceKey,
} from "@/components/quotation-template/types";

/**
 * Adapter: TripzoCRM's public itinerary API -> the portable <QuotationTemplate />
 * (classic skin) data contract.
 *
 * READ-ONLY. This only ever issues a GET to the backend's public endpoint — the
 * same one the customer-facing itinerary page, the mobile app's Preview/PDF
 * screen, and the non-classic offbeat_template adapter all read. It needs no
 * auth, and nothing here writes anything back to TripzoCRM.
 *
 * Kept separate from components/quotation-template/ on purpose: that package
 * knows nothing about TripzoCRM specifically, so it can be dropped into any
 * CRM. This file is the one piece that is TripzoCRM-specific, translating its
 * API shape into the template's generic QuotationData.
 */

const BACKEND_URL = "https://api.tripzocrm.cloud";
const SUPABASE_URL = "https://supa.tripzocrm.cloud";
const WEB_ORIGIN = "https://www.tripzocrm.com";

// Used only where the DB record genuinely has no image uploaded yet — never
// in place of a real image that exists.
const FALLBACK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1518744865364-a5323b5a9e29?auto=format&fit=crop&w=1600&q=80";

// -----------------------------------------------------------------------
// Raw API shape (loose — just the fields this adapter reads)
// -----------------------------------------------------------------------

interface RawPackage {
  package_name?: string | null;
  banner_image?: string | null;
  whatsapp_banner_image?: string | null;
  destinations?: string[] | null;
  inclusions?: string | null;
  exclusions?: string | null;
  meal?: string | null;
  days?: number | null;
  nights?: number | null;
}

interface RawItinerary {
  id: string;
  slug?: string | null;
  customer_name?: string | null;
  date_of_journey?: string | null;
  /** When present, used as the "Date:" shown on the cover; falls back to today. */
  created_at?: string | null;
  total_package_cost?: number | string | null;
  advance_amount_to_pay_for_trip_confirmation?: number | string | null;
  summary?: {
    tourDuration?: string;
    tourStartDate?: string;
    tourStartCity?: string;
    adults?: number;
    kids?: number;
    rooms?: number;
  } | null;
}

interface RawDay {
  id: string;
  title?: string | null;
  day_num: number;
  sightseeing?: { city?: string | null } | null;
}

interface RawOrganization {
  name?: string | null;
  image_url?: string | null;
  phone?: string | null;
  email?: string | null;
  policy_defaults?: {
    payment_policy?: string | null;
    cancellation_policy?: string | null;
    terms_and_conditions?: string | null;
  } | null;
}

interface RawStay {
  hotel_name?: string | null;
  city?: string | null;
  star_category?: number | null;
  user_rating?: number | null;
  nights?: number | null;
  room_type?: string | null;
  meal_plan_name?: string | null;
  check_in?: string | null;
  check_in_time?: string | null;
  check_out?: string | null;
  check_out_time?: string | null;
}

interface RawVehicle {
  vehicle_type?: string | null;
  vehicle_model?: string | null;
}

interface RawResponse {
  itinerary: RawItinerary & { package?: RawPackage | null };
  pkg: RawPackage | null;
  days: RawDay[];
  organization: RawOrganization | null;
  stays?: RawStay[];
  vehicles?: RawVehicle[];
}

// -----------------------------------------------------------------------
// Fetch — one read-only GET, no auth, nothing written back
// -----------------------------------------------------------------------

export async function fetchTripzoItinerary(idOrSlug: string): Promise<RawResponse> {
  const res = await fetch(
    `${BACKEND_URL}/api/public/itineraries/${encodeURIComponent(idOrSlug)}`,
    { method: "GET", next: { revalidate: 300 } }
  );
  if (!res.ok) {
    throw new Error(`Could not load itinerary "${idOrSlug}" (HTTP ${res.status}).`);
  }
  const raw = (await res.json()) as RawResponse;
  if (!raw?.itinerary) {
    throw new Error(`Itinerary "${idOrSlug}" was not found.`);
  }
  return raw;
}

// -----------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------

function mediaUrl(path?: string | null): string | undefined {
  const value = path?.trim();
  if (!value) return undefined;
  if (value.startsWith("http") || value.startsWith("data:")) return value;
  return `${SUPABASE_URL}/storage/v1/object/public/media/${value}`;
}

function titleCase(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function money(value: unknown): string {
  const n = Number(value ?? 0);
  if (!Number.isFinite(n)) return "₹0";
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

/** "2026-10-13" -> "13 Oct 2026" */
function formatDate(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

/** "2026-10-13" -> "Wed, 13 Oct 2026" */
function formatDateWithWeekday(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function addDays(iso: string, days: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/** "14:00:00" -> "14:00" */
function hhmm(time?: string | null): string {
  return time?.slice(0, 5) ?? "";
}

/** Pulls the <li> text out of the rich-text inclusions/exclusions HTML, plain-line fallback. */
function htmlListToLines(html?: string | null): string[] {
  const text = html?.trim();
  if (!text) return [];
  const items = [...text.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, "").trim()
  );
  if (items.length) return items.filter(Boolean);
  return text
    .replace(/<[^>]+>/g, "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

/** Policy paragraphs are stored as plain text; blank-line-separated = paragraphs, else one bullet per line. */
function textLines(text?: string | null): string[] {
  const t = text?.trim();
  if (!t) return [];
  const byBlankLine = t.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  if (byBlankLine.length > 1) return byBlankLine;
  return t.split("\n").map((l) => l.trim()).filter(Boolean);
}

// -----------------------------------------------------------------------
// Mapping
// -----------------------------------------------------------------------

export function toQuotationData(raw: RawResponse): QuotationData {
  const it = raw.itinerary;
  const pkg = raw.pkg ?? it.package ?? null;
  const org = raw.organization;
  const stays = raw.stays ?? [];
  const vehicles = raw.vehicles ?? [];
  const summary = it.summary ?? {};

  const agencyName = (org?.name ?? "Your travel company").replace(/\s+/g, " ").trim();
  const adults = Number(summary.adults) || 0;
  const kids = Number(summary.kids) || 0;
  const destinations = (pkg?.destinations ?? []).map(titleCase);
  const primaryPlace = summary.tourStartCity || destinations[0] || "";

  const journeyStart = it.date_of_journey ?? summary.tourStartDate ?? null;
  const duration = summary.tourDuration ?? (pkg?.days ? `${pkg.days}D / ${pkg.nights ?? pkg.days - 1}N` : "");
  const travelDate = formatDate(it.date_of_journey);
  const paxLabel = [adults ? `${adults} Adult${adults === 1 ? "" : "s"}` : "", kids ? `${kids} Kid${kids === 1 ? "" : "s"}` : ""]
    .filter(Boolean)
    .join(", ");

  const servicesInclude: ServiceKey[] = [];
  if (stays.length) servicesInclude.push("Hotels");
  if (raw.days.length) servicesInclude.push("Tours");
  if (vehicles.length) servicesInclude.push("Transport");
  if (pkg?.meal) servicesInclude.push("Meals");

  const hotels: HotelStay[] = stays.map((s) => ({
    name: s.hotel_name ?? "Hotel",
    location: s.city ? `${s.city}, India` : "India",
    stars: Math.round(s.star_category ?? s.user_rating ?? 3),
    nights: s.nights ?? 0,
    roomType: s.room_type ?? "Standard",
    mealPlan: s.meal_plan_name ?? "—",
    checkInDate: formatDate(s.check_in),
    checkInTime: hhmm(s.check_in_time),
    checkOutDate: formatDate(s.check_out),
    checkOutTime: hhmm(s.check_out_time),
  }));

  const vehicleLabel = vehicles[0]
    ? [vehicles[0].vehicle_model, vehicles[0].vehicle_type].filter(Boolean).join(" · ")
    : "";

  const itinerary: ItineraryDay[] = raw.days
    .slice()
    .sort((a, b) => a.day_num - b.day_num)
    .map((d) => {
      const date = journeyStart ? addDays(journeyStart, d.day_num - 1) : null;
      return {
        day: d.day_num,
        title: d.title?.trim() || `Day ${d.day_num}`,
        location: d.sightseeing?.city ?? primaryPlace,
        date: date ? formatDateWithWeekday(date) : "",
        bullets: d.title?.trim() ? [d.title.trim()] : [],
        transferTag: vehicleLabel ? `${vehicleLabel} Transfer` : undefined,
        meals: pkg?.meal ? [pkg.meal] : [],
      };
    });

  const policies: PolicyBlock = {
    inclusions: htmlListToLines(pkg?.inclusions),
    exclusions: htmlListToLines(pkg?.exclusions),
    payment: textLines(org?.policy_defaults?.payment_policy),
    cancellation: textLines(org?.policy_defaults?.cancellation_policy),
    bookingTerms: textLines(org?.policy_defaults?.terms_and_conditions),
  };

  const totalCost = Number(it.total_package_cost) || 0;
  const payingHeads = adults || 1;
  const perHeadRate = totalCost / payingHeads;

  const slugOrId = it.slug?.trim() || it.id;
  const quotationUrl = `${WEB_ORIGIN}/itinerary/${slugOrId}`;

  return {
    quotationNumber: it.id.slice(0, 8).toUpperCase(),
    quotationDate: formatDate(it.created_at ?? new Date().toISOString()),
    heroImageUrl: mediaUrl(pkg?.banner_image) ?? mediaUrl(pkg?.whatsapp_banner_image) ?? FALLBACK_HERO_IMAGE,
    destinationTag: (primaryPlace || "TRIP").toUpperCase(),
    title: pkg?.package_name ?? "Your Package",
    heroSummary: [duration, travelDate, paxLabel].filter(Boolean).join(" | "),

    agency: {
      name: agencyName,
      phone: org?.phone ?? "",
      email: org?.email ?? "",
      website: WEB_ORIGIN,
      logoUrl: mediaUrl(org?.image_url),
    },

    trip: {
      customerName: it.customer_name?.trim() || "Guest",
      destination: destinations.join(", ") || (summary.tourStartCity ?? ""),
      duration,
      travelDate,
      pax: paxLabel,
      rooms: summary.rooms ? `${summary.rooms} Room${summary.rooms === 1 ? "" : "s"}` : "",
      preparedBy: agencyName,
    },

    price: {
      perPersonLabel: adults ? "Per Adult" : "Per Person",
      pax: payingHeads,
      rate: money(perHeadRate),
      perPersonAmount: money(totalCost),
      totalLabel: "Total Package Cost",
      totalAmount: money(totalCost),
    },

    servicesInclude,
    hotels,
    itinerary,
    policies,

    thankYou: {
      heading: "Thank You for Choosing Us!",
      subheading: "We look forward to making your travel dreams come true.",
      message: `Dear ${it.customer_name?.trim() || "Guest"}, we truly appreciate your trust in us.`,
      consultantName: agencyName,
      consultantPhone: org?.phone ?? "",
      consultantEmail: org?.email ?? "",
      website: WEB_ORIGIN,
      quotationUrl,
    },
  };
}

/** Convenience: fetch + map in one call. */
export async function fetchQuotationData(idOrSlug: string): Promise<QuotationData> {
  const raw = await fetchTripzoItinerary(idOrSlug);
  return toQuotationData(raw);
}
