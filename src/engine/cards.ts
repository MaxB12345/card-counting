export const SUITS = ['♠', '♥', '♦', '♣'] as const
export const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const
export const CARDS_PER_DECK = SUITS.length * RANKS.length

export type Suit = (typeof SUITS)[number]
export type Rank = (typeof RANKS)[number]
export type Card = { rank: Rank; suit: Suit }

const RED_SUITS: readonly Suit[] = ['♥', '♦']

/** Returns true when the card is drawn in red ink. */
export function isRed(card: Card): boolean {
  return RED_SUITS.includes(card.suit)
}

/** Builds an ordered shoe containing `deckCount` standard 52-card decks. */
export function buildShoe(deckCount: number): Card[] {
  if (!Number.isInteger(deckCount) || deckCount < 1) {
    throw new Error(`deckCount must be a positive integer, got ${deckCount}`)
  }
  const deck = SUITS.flatMap((suit) => RANKS.map((rank) => ({ rank, suit })))
  return Array.from({ length: deckCount }, () => deck).flat()
}

/** Fisher-Yates shuffle. Returns a new array; `random` is injectable for tests. */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
