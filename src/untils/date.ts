export function formatDateForInput(date?: string): string {
  if (!date) return "";

  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
}