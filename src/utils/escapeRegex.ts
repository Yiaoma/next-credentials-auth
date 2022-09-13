export const escapeRegex = (pattern: string): string =>
  pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
