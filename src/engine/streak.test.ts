import { describe, expect, it } from 'vitest'
import { bestStreak, currentStreak, dayKey, practisedToday } from './streak'

const at = (month: number, day: number, hour = 12) => new Date(2026, month - 1, day, hour).getTime()
const key = (month: number, day: number) => dayKey(at(month, day))

describe('dayKey', () => {
  it('formats the local date with zero padding', () => {
    expect(dayKey(new Date(2026, 0, 5, 23, 59).getTime())).toBe('2026-01-05')
  })
})

describe('currentStreak', () => {
  it('is zero with no practice days', () => {
    expect(currentStreak([], at(3, 10))).toBe(0)
  })

  it('counts consecutive days ending today', () => {
    expect(currentStreak([key(3, 8), key(3, 9), key(3, 10)], at(3, 10))).toBe(3)
  })

  it("keeps yesterday's streak while today is not yet practised", () => {
    expect(currentStreak([key(3, 8), key(3, 9)], at(3, 10))).toBe(2)
  })

  it('resets after a missed day', () => {
    expect(currentStreak([key(3, 7), key(3, 8)], at(3, 10))).toBe(0)
  })

  it('stops at a gap', () => {
    expect(currentStreak([key(3, 5), key(3, 9), key(3, 10)], at(3, 10))).toBe(2)
  })

  it('crosses month and year boundaries', () => {
    const days = [dayKey(new Date(2025, 11, 31).getTime()), dayKey(new Date(2026, 0, 1).getTime())]
    expect(currentStreak(days, new Date(2026, 0, 1, 9).getTime())).toBe(2)
  })
})

describe('bestStreak', () => {
  it('finds the longest run regardless of order or duplicates', () => {
    const days = [key(3, 10), key(3, 2), key(3, 3), key(3, 4), key(3, 3), key(3, 9)]
    expect(bestStreak(days)).toBe(3)
  })

  it('is zero when empty', () => {
    expect(bestStreak([])).toBe(0)
  })
})

describe('practisedToday', () => {
  it('only matches the current local day', () => {
    expect(practisedToday([key(3, 9)], at(3, 10))).toBe(false)
    expect(practisedToday([key(3, 10)], at(3, 10, 1))).toBe(true)
  })
})
