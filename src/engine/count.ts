import { CARDS_PER_DECK, type Card } from './cards'
import type { CountingSystem } from './systems'

/** Sums the count value of every card dealt so far. */
export function runningCount(cards: readonly Card[], system: CountingSystem): number {
  return cards.reduce((total, card) => total + system.value(card.rank), 0)
}

/** Decks left in the shoe, as a fraction (e.g. 1.5). */
export function decksRemaining(cardsLeft: number): number {
  return cardsLeft / CARDS_PER_DECK
}

/** Running count divided by decks remaining, rounded to the nearest whole number. */
export function trueCount(running: number, decksLeft: number): number {
  if (decksLeft <= 0) throw new Error('decksLeft must be greater than zero')
  return Math.round(running / decksLeft)
}
