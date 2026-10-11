import type { Rank } from './cards'

export type CountingSystem = {
  id: string
  name: string
  /** Count value contributed by a card of the given rank. */
  value: (rank: Rank) => number
}

const LOW_RANKS: readonly Rank[] = ['2', '3', '4', '5', '6']
const HIGH_RANKS: readonly Rank[] = ['10', 'J', 'Q', 'K', 'A']

export const HI_LO: CountingSystem = {
  id: 'hi-lo',
  name: 'Hi-Lo',
  value: (rank) => {
    if (LOW_RANKS.includes(rank)) return 1
    if (HIGH_RANKS.includes(rank)) return -1
    return 0
  },
}
