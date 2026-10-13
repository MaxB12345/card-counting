import { trueCount } from './count'

export type TrueCountScenario = {
  runningCount: number
  decksLeft: number
  expected: number
}

const MAX_RUNNING_COUNT = 20
const MIN_DECKS_LEFT = 0.5
const MAX_DECKS_LEFT = 6
const DECK_STEP = 0.5
const HALF = 0.5
const FLOAT_TOLERANCE = 1e-9

const DECK_OPTIONS = Array.from(
  { length: (MAX_DECKS_LEFT - MIN_DECKS_LEFT) / DECK_STEP + 1 },
  (_, step) => MIN_DECKS_LEFT + step * DECK_STEP,
)

/** True when the quotient sits exactly between two integers, so rounding is ambiguous. */
function isAmbiguousRounding(runningCount: number, decksLeft: number): boolean {
  const fraction = Math.abs(runningCount / decksLeft) % 1
  return Math.abs(fraction - HALF) < FLOAT_TOLERANCE
}

function candidateRunningCounts(decksLeft: number): number[] {
  const counts: number[] = []
  for (let count = -MAX_RUNNING_COUNT; count <= MAX_RUNNING_COUNT; count++) {
    if (count !== 0 && !isAmbiguousRounding(count, decksLeft)) counts.push(count)
  }
  return counts
}

/**
 * Builds a practice question. Counts of zero and exact .5 quotients are skipped so
 * there is always one unambiguous answer. `random` is injectable for tests.
 */
export function generateScenario(random: () => number = Math.random): TrueCountScenario {
  const decksLeft = DECK_OPTIONS[Math.floor(random() * DECK_OPTIONS.length)]
  const counts = candidateRunningCounts(decksLeft)
  const runningCount = counts[Math.floor(random() * counts.length)]
  return { runningCount, decksLeft, expected: trueCount(runningCount, decksLeft) }
}
