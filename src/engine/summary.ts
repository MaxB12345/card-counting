import { isCorrect, type RunResult } from '../storage/stats'

const RECENT_WINDOW = 10

export type ModeSummary = {
  mode: RunResult['mode']
  runs: number
  /** Fraction correct across all stored results, 0 to 1. */
  accuracy: number
  avgDurationMs: number
  /** Fraction correct across the most recent results, 0 to 1. */
  recentAccuracy: number
}

const MODES: readonly RunResult['mode'][] = ['flash', 'countdown', 'true-count']

function fractionCorrect(results: readonly RunResult[]): number {
  return results.length === 0 ? 0 : results.filter(isCorrect).length / results.length
}

function average(values: readonly number[]): number {
  return values.length === 0 ? 0 : values.reduce((sum, value) => sum + value, 0) / values.length
}

/** One summary per mode, in a fixed order, including modes with no results yet. */
export function summariseByMode(results: readonly RunResult[]): ModeSummary[] {
  return MODES.map((mode) => {
    const modeResults = results.filter((result) => result.mode === mode)
    return {
      mode,
      runs: modeResults.length,
      accuracy: fractionCorrect(modeResults),
      avgDurationMs: average(modeResults.map((result) => result.durationMs)),
      recentAccuracy: fractionCorrect(modeResults.slice(-RECENT_WINDOW)),
    }
  })
}
