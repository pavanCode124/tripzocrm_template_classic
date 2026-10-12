import { QuotationTemplate } from "@/components/quotation-template";
import { fetchQuotationData } from "@/lib/tripzoAdapter";

// The itinerary slug for the "TEST Munnar Hills 4D/3N" package, as entered
// through the Itineraries builder — same test record the offbeat_template
// (non-classic) preview reads. Swap this for whatever slug/id your own flow
// is rendering.
const ITINERARY_SLUG = "ih8b8unq";

/**
 * Live preview — fetches the real (read-only) itinerary from TripzoCRM's
 * public API and renders it through the portable <QuotationTemplate />.
 * No database write of any kind happens anywhere in this path.
 */
export default async function PreviewPage() {
  try {
    const data = await fetchQuotationData(ITINERARY_SLUG);
    return (
      <main className="preview-shell">
        <QuotationTemplate data={data} />
      </main>
    );
  } catch (err) {
    return (
      <main className="preview-shell">
        <div
          style={{
            maxWidth: 640,
            margin: "80px auto",
            background: "#fff",
            borderRadius: 12,
            padding: 24,
            fontFamily: "sans-serif",
          }}
        >
          <h1 style={{ fontSize: 18, marginBottom: 8 }}>
            Could not load itinerary &quot;{ITINERARY_SLUG}&quot;
          </h1>
          <p style={{ color: "#64748b", fontSize: 14 }}>
            {err instanceof Error ? err.message : String(err)}
          </p>
        </div>
      </main>
    );
  }
}
