"use client";

import { useState } from "react";
import { PrinterIcon } from "./icons";
import styles from "./PrintButton.module.css";

/** Resolves once every image on the page has finished loading (or failed — we don't block forever on a dead URL). */
function waitForImages(): Promise<void> {
  const images = Array.from(document.images);
  return Promise.all(
    images.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          })
    )
  ).then(() => undefined);
}

/**
 * Floating "Print / Save PDF" control, fixed to the top-right of the
 * viewport. Calls the browser's native print dialog — on desktop Chrome/Edge
 * "Save as PDF" is one of the destinations right there, so this doubles as
 * the export-to-PDF path with no extra library.
 *
 * Waits for every image (hero photo, logo — all loaded from a remote URL)
 * to finish before opening the dialog. Printing immediately on click races
 * the network: an image that hasn't loaded yet prints as blank, which is
 * the #1 reason a "Print" button produces a PDF with missing photos.
 *
 * Client Component on purpose: this needs the browser. Everything else in
 * this package can render on the server.
 */
export function PrintButton() {
  const [preparing, setPreparing] = useState(false);

  async function handlePrint() {
    setPreparing(true);
    try {
      await Promise.all([
        waitForImages(),
        document.fonts?.ready ?? Promise.resolve(),
      ]);
    } finally {
      // Give the browser a frame to paint any image that just finished
      // decoding before the print snapshot is taken.
      requestAnimationFrame(() => {
        window.print();
        setPreparing(false);
      });
    }
  }

  return (
    <div className={styles.wrap} data-print-hide>
      <button
        type="button"
        className={styles.button}
        onClick={handlePrint}
        disabled={preparing}
      >
        <PrinterIcon width={16} height={16} />
        {preparing ? "Preparing…" : "Print"}
      </button>
    </div>
  );
}
