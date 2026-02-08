/**
 * Convert a string to a URL-friendly slug
 * @param text - The text to slugify
 * @returns A URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}
