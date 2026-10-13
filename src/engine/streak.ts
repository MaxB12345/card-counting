/** Local-date key (YYYY-MM-DD) for a timestamp, so streaks follow the player's own midnight. */
export function dayKey(timestamp: number): string {
  const date = new Date(timestamp)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function shiftDay(key: string, offset: number): string {
  const [year, month, day] = key.split('-').map(Number)
  return dayKey(new Date(year, month - 1, day + offset).getTime())
}

/**
 * Consecutive practice days ending today. If today hasn't been practised yet the
 * streak still counts through yesterday, so it only breaks once a day is missed.
 */
export function currentStreak(days: readonly string[], now: number): number {
  const practised = new Set(days)
  let cursor = dayKey(now)
  if (!practised.has(cursor)) cursor = shiftDay(cursor, -1)

  let streak = 0
  while (practised.has(cursor)) {
    streak++
    cursor = shiftDay(cursor, -1)
  }
  return streak
}

/** Longest run of consecutive practice days on record. */
export function bestStreak(days: readonly string[]): number {
  const sorted = [...new Set(days)].sort()
  let best = 0
  let run = 0
  sorted.forEach((key, index) => {
    const continues = index > 0 && shiftDay(sorted[index - 1], 1) === key
    run = continues ? run + 1 : 1
    best = Math.max(best, run)
  })
  return best
}

export function practisedToday(days: readonly string[], now: number): boolean {
  return days.includes(dayKey(now))
}
