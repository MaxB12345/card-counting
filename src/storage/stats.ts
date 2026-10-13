const STORAGE_KEY = 'card-counter:results'
const MAX_STORED_RESULTS = 200

export type RunResult = {
  mode: 'flash' | 'countdown' | 'true-count'
  expected: number
  entered: number
  /** Cards dealt; absent for modes that don't deal cards. */
  cardCount?: number
  durationMs: number
  playedAt: number
}

/** Reads saved results; returns an empty list if storage is unavailable or corrupt. */
export function loadResults(): RunResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as RunResult[]) : []
  } catch {
    return []
  }
}

/** Appends a result, keeping only the most recent entries. Storage failure is non-fatal. */
export function saveResult(result: RunResult): void {
  const results = [...loadResults(), result].slice(-MAX_STORED_RESULTS)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results))
  } catch {
    // Private mode or full storage: training still works, history just isn't kept.
  }
}

export function isCorrect(result: RunResult): boolean {
  return result.entered === result.expected
}
