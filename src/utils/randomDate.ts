export function generateRandomDate(start: string, end: string): string {
  const startMs = new Date(start).getTime();
  const endMs = new Date(end).getTime();
  const randomMs = startMs + Math.random() * (endMs - startMs);
  return new Date(randomMs).toISOString();
}
