/** Formats a count with an explicit sign, e.g. +4, -3, 0. */
export function formatSigned(value: number): string {
  return value > 0 ? `+${value}` : String(value)
}
