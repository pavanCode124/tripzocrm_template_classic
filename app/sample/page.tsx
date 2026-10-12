import { QuotationTemplate } from "@/components/quotation-template";
import { sampleQuotation } from "@/lib/sampleQuotation";

/**
 * Static preview using the bundled sample data (lib/sampleQuotation.ts) —
 * the exact same quotation #2625 / Anudeep Reddy content as the reference
 * "classic" PDF this template was built to match. Useful for visually
 * comparing the live page against the reference without depending on
 * network access to TripzoCRM.
 */
export default function SamplePreviewPage() {
  return (
    <main className="preview-shell">
      <QuotationTemplate data={sampleQuotation} />
    </main>
  );
}
