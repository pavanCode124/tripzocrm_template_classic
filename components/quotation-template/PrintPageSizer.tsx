"use client";

import { useEffect } from "react";

const STYLE_ID = "qt-page-sizes-classic";

/** CSS px -> mm, rounded up (plus a hair) so a page box is never a
 *  fraction shorter than the content it has to hold — being short by even
 *  half a pixel pushes a blank sheet into the PDF. */
function toMm(px: number) {
  return (Math.ceil((px / 96) * 25.4 * 10) / 10 + 0.3).toFixed(1);
}

/**
 * Gives every page its own `@page` size, so the printed PDF has the same
 * per-page heights as the pages on screen.
 *
 * The reference "classic" quotation PDF is 595pt (210mm) wide on every page
 * but a different height on nearly every one — the shortest page is 283pt,
 * the policies page is 958pt. A single `@page { size: A4 }` cannot express
 * that, which is why a naive implementation stretches every page to A4 with
 * the footer pushed to the bottom of a mostly empty sheet.
 *
 * So: measure each rendered `[data-qt-page]` element and emit one named
 * page per page —
 *
 *     @page qtp3 { size: 210mm 140.1mm; margin: 0 }
 *     [data-qt-page="3"] { page: qtp3 }
 *
 * Named pages with their own `size` are what Chrome/Edge (and so every
 * "Save as PDF" that goes through them — including the reference PDF
 * itself, whose producer is Skia/PDF via headless Chrome) use to vary page
 * geometry. Browsers that don't support it fall back to the plain
 * `@page { size: A4 }` in QuotationTemplate.module.css.
 *
 * Re-measured on mount, after fonts and images settle, on resize, and again
 * on `beforeprint` — the last one covers Ctrl+P as well as the Print button.
 */
export function PrintPageSizer() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const apply = () => {
      const pages = Array.from(
        document.querySelectorAll<HTMLElement>("[data-qt-page]")
      );
      if (pages.length === 0) return;

      const css = pages
        .map((el) => {
          const n = el.getAttribute("data-qt-page");
          const name = `qtp${n}`;
          // offsetHeight, not getBoundingClientRect: it is the layout box,
          // unaffected by any transform a host page may have applied.
          const mm = toMm(el.offsetHeight);
          return `@page ${name}{size:210mm ${mm}mm;margin:0}[data-qt-page="${n}"]{page:${name}}`;
        })
        .join("\n");

      let tag = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
      if (!tag) {
        tag = document.createElement("style");
        tag.id = STYLE_ID;
        document.head.appendChild(tag);
      }
      if (tag.textContent !== css) tag.textContent = css;
    };

    /* A plain timeout rather than requestAnimationFrame on purpose: rAF
       never fires while the tab is hidden, and a quotation left open in a
       background tab still has to be measured before it is printed. */
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(apply, 0);
    };

    apply();
    schedule();

    // Images arrive late and change a page's height when they do.
    const images = Array.from(document.images);
    images.forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", schedule);
      img.addEventListener("error", schedule);
    });

    document.fonts?.ready.then(schedule).catch(() => undefined);

    const observer = new ResizeObserver(schedule);
    document
      .querySelectorAll<HTMLElement>("[data-qt-page]")
      .forEach((el) => observer.observe(el));

    window.addEventListener("beforeprint", apply);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("beforeprint", apply);
      images.forEach((img) => {
        img.removeEventListener("load", schedule);
        img.removeEventListener("error", schedule);
      });
      document.getElementById(STYLE_ID)?.remove();
    };
  }, []);

  return null;
}
