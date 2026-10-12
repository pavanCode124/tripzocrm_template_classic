const URL_RE = /^(https?:\/\/\S+)$/;

function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g).filter(Boolean);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("_") && part.endsWith("_")) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    return <span key={key}>{part}</span>;
  });
}

/**
 * Renders a line of text that may contain **bold**, _italic_, or be a bare
 * URL (rendered as a link). Used throughout the template for itinerary
 * bullets and policy lines so content authors can lightly format text
 * without shipping HTML/React elements through the data layer.
 */
export function Rich({ text }: { text: string }) {
  const trimmed = text.trim();
  if (URL_RE.test(trimmed)) {
    return (
      <a href={trimmed} target="_blank" rel="noreferrer">
        {trimmed}
      </a>
    );
  }
  return <>{renderInline(text, "r")}</>;
}
