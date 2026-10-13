import { describe, expect, it } from 'vitest'
import type { RunResult } from '../storage/stats'
import { summariseByMode } from './summary'

const result = (mode: RunResult['mode'], correct: boolean, durationMs = 1000): RunResult => ({
  mode,
  expected: 1,
  entered: correct ? 1 : 2,
  durationMs,
  playedAt: 0,
})

describe('summariseByMode', () => {
  it('returns every mode, empty ones with zero runs', () => {
    const summaries = summariseByMode([])
    expect(summaries.map((summary) => summary.mode)).toEqual(['flash', 'countdown', 'true-count'])
    expect(summaries.every((summary) => summary.runs === 0 && summary.accuracy === 0)).toBe(true)
  })

  it('keeps modes separate and computes accuracy and average time', () => {
    const [flash, , trueCount] = summariseByMode([
      result('flash', true, 2000),
      result('flash', false, 4000),
      result('true-count', true),
    ])
    expect(flash).toMatchObject({ runs: 2, accuracy: 0.5, avgDurationMs: 3000 })
    expect(trueCount).toMatchObject({ runs: 1, accuracy: 1 })
  })

  it('limits recent accuracy to the last 10 results', () => {
    const older = Array.from({ length: 10 }, () => result('flash', false))
    const recent = Array.from({ length: 10 }, () => result('flash', true))
    const [flash] = summariseByMode([...older, ...recent])
    expect(flash.accuracy).toBe(0.5)
    expect(flash.recentAccuracy).toBe(1)
  })
})
