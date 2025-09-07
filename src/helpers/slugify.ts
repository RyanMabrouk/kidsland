export function slugify(text: string): string {
  return text
    .normalize("NFD")                 // split accents
    .replace(/[\u0300-\u036f]/g, "") // remove accents (é -> e)
    .replace(/[^a-zA-Z0-9\u0600-\u06FF\s-]/g, "") // keep arabic + latin + numbers
    .trim()
    .replace(/\s+/g, "-")             // spaces → dashes
    .toLowerCase();
}
