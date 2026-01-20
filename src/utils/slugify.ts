export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-') // sve što nije slovo/broj -> crtica
    .replace(/^-+|-+$/g, '') // makni crtice na početku/kraju
}
