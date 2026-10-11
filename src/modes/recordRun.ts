import type { Card } from '../engine/cards'
import { runningCount } from '../engine/count'
import { HI_LO } from '../engine/systems'
import { saveResult, type RunResult } from '../storage/stats'

type Run = {
  mode: RunResult['mode']
  cards: readonly Card[]
  entered: number
  durationMs: number
}

/** Scores a finished run against the Hi-Lo count, saves it, and returns the result. */
export function recordRun({ mode, cards, entered, durationMs }: Run): RunResult {
  const result: RunResult = {
    mode,
    expected: runningCount(cards, HI_LO),
    entered,
    cardCount: cards.length,
    durationMs,
    playedAt: Date.now(),
  }
  saveResult(result)
  return result
}
