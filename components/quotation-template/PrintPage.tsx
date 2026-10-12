import type { ReactNode } from "react";
import type { AgencyInfo } from "./types";
import { PageFooter } from "./PageFooter";
import styles from "./PrintPage.module.css";

/**
 * One page of the quotation. 210mm wide always, but — like the reference
 * PDF, whose pages range from 283pt to 958pt tall — only as tall as the
 * content it holds, with a 140mm floor. Nothing is stretched to A4 and
 * nothing is clipped, so the footer sits directly under the content instead
 * of being stranded at the bottom of a half-empty sheet.
 *
 * Unlike the non-classic offbeat_template, the classic skin has no
 * full-bleed cover photo (the hero image sits inset inside the normal page
 * margins, like any other block) and no full-A4 thank-you panel — every
 * page, cover and closing page included, is just a normal content page.
 *
 * <PrintPageSizer> measures each of these elements and writes the matching
 * `@page { size: 210mm <h>mm }` rule, which is what carries the variable
 * height through to the printed/saved PDF.
 */
export function PrintPage({
  children,
  page,
  totalPages,
  agency,
}: {
  children: ReactNode;
  page: number;
  totalPages: number;
  agency: AgencyInfo;
}) {
  return (
    <div data-qt-page={page} className={styles.page}>
      <div className={styles.body}>
        <div className={styles.content}>{children}</div>
        <PageFooter agency={agency} page={page} totalPages={totalPages} />
      </div>
    </div>
  );
}
