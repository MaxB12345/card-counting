import { describe, expect, it } from 'vitest'
import { CARDS_PER_DECK, buildShoe, shuffle } from './cards'
import { decksRemaining, runningCount, trueCount } from './count'
import { HI_LO } from './systems'

describe('buildShoe', () => {
  it('contains 52 cards per deck', () => {
    expect(buildShoe(6)).toHaveLength(6 * CARDS_PER_DECK)
  })

  it('rejects a deck count below one', () => {
    expect(() => buildShoe(0)).toThrow()
  })
})

describe('shuffle', () => {
  it('keeps every card and does not mutate the input', () => {
    const shoe = buildShoe(1)
    const shuffled = shuffle(shoe)
    expect(shuffled).toHaveLength(shoe.length)
    expect(new Set(shuffled).size).toBe(shoe.length)
    expect(shoe[0]).toEqual({ rank: 'A', suit: '♠' })
  })
})

describe('Hi-Lo', () => {
  it('counts a full deck to zero', () => {
    expect(runningCount(buildShoe(1), HI_LO)).toBe(0)
  })

  it('counts low cards +1, neutral 0, and high cards -1', () => {
    const cards = [
      { rank: '5', suit: '♠' },
      { rank: '8', suit: '♥' },
      { rank: 'K', suit: '♦' },
      { rank: 'A', suit: '♣' },
    ] as const
    expect(runningCount(cards, HI_LO)).toBe(-1)
  })
})

describe('trueCount', () => {
  it('divides the running count by decks remaining and rounds', () => {
    expect(trueCount(6, decksRemaining(CARDS_PER_DECK * 3))).toBe(2)
    expect(trueCount(5, 2)).toBe(3)
  })

  it('throws when no decks remain', () => {
    expect(() => trueCount(3, 0)).toThrow()
  })
})
