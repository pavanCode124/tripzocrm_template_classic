import type { Metadata } from "next";
import "./globals.css";

// The classic template deliberately uses system/web-safe font stacks
// (serif headings, sans-serif body — see QuotationTemplate.module.css)
// rather than a custom webfont, matching the reference PDF (which itself
// falls back to plain serif/sans-serif substitutes). No next/font load
// needed here; your real CRM app can drop this component tree in as-is
// with no extra font setup.
export const metadata: Metadata = {
  title: "Quotation Template Preview (Classic) | Offbeat Compass",
  description:
    "Local preview harness for the portable classic quotation-template component.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
