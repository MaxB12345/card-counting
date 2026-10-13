import { describe, expect, it } from 'vitest'
import { generateScenario } from './scenario'

const SAMPLE_SIZE = 500

describe('generateScenario', () => {
  const scenarios = Array.from({ length: SAMPLE_SIZE }, () => generateScenario())

  it('never produces a zero running count', () => {
    expect(scenarios.every((s) => s.runningCount !== 0)).toBe(true)
  })

  it('keeps decks remaining within half-deck steps from 0.5 to 6', () => {
    expect(scenarios.every((s) => s.decksLeft >= 0.5 && s.decksLeft <= 6)).toBe(true)
    expect(scenarios.every((s) => (s.decksLeft * 2) % 1 === 0)).toBe(true)
  })

  it('never lands on an ambiguous .5 quotient', () => {
    const fractions = scenarios.map((s) => Math.abs(s.runningCount / s.decksLeft) % 1)
    expect(fractions.every((fraction) => Math.abs(fraction - 0.5) > 1e-6)).toBe(true)
  })

  it('computes expected as the rounded running count over decks left', () => {
    expect(scenarios.every((s) => s.expected === Math.round(s.runningCount / s.decksLeft))).toBe(
      true,
    )
  })

  it('is deterministic for a fixed random source', () => {
    expect(generateScenario(() => 0)).toEqual(generateScenario(() => 0))
  })
})
