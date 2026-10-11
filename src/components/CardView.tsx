import { isRed, type Card } from '../engine/cards'

/** Renders a single playing card face. */
export function CardView({ card }: { card: Card }) {
  const colorClass = isRed(card) ? 'card card--red' : 'card'
  return (
    <div className={colorClass} aria-label={`${card.rank} of ${card.suit}`}>
      <span className="card__corner">{card.rank}</span>
      <span className="card__suit">{card.suit}</span>
    </div>
  )
}
