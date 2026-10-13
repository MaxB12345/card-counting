import { dayKey } from '../engine/streak'
import type { RunResult } from './stats'

const STORAGE_KEY = 'card-counter:days'
const MAX_STORED_DAYS = 730

function readStored(): string[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : null
  } catch {
    return null
  }
}

function uniqueSorted(days: readonly string[]): string[] {
  return [...new Set(days)].sort()
}

/**
 * Days on which at least one result was saved. Kept apart from the capped result
 * history so streaks survive long after old results are dropped. Before this list
 * exists it is seeded from `results` so existing players keep their history.
 */
export function loadPracticeDays(results: readonly RunResult[]): string[] {
  return readStored() ?? uniqueSorted(results.map((result) => dayKey(result.playedAt)))
}

/** Adds the day of `timestamp` to the list. Storage failure is non-fatal. */
export function recordPracticeDay(timestamp: number, results: readonly RunResult[]): void {
  const days = uniqueSorted([...loadPracticeDays(results), dayKey(timestamp)]).slice(-MAX_STORED_DAYS)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(days))
  } catch {
    // Private mode or full storage: the streak just won't persist.
  }
}
