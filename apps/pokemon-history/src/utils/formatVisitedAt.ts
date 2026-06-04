export function formatVisitedAt(value?: string): string {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("es", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(date);
}
