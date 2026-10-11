import { isCorrect, loadResults } from '../storage/stats'

type Props = {
  onStartFlash: () => void
  onStartCountdown: () => void
}

/** Mode picker with a short summary of saved results. */
export function Home({ onStartFlash, onStartCountdown }: Props) {
  const results = loadResults()
  const correct = results.filter(isCorrect).length

  return (
    <div className="stack">
      <h1>Card Counter</h1>
      <p className="muted">Hi-Lo trainer</p>
      <button className="btn" onClick={onStartFlash}>
        Flash count
      </button>
      <button className="btn" onClick={onStartCountdown}>
        Deck countdown
      </button>
      <p className="muted">
        {results.length === 0
          ? 'No sessions yet.'
          : `${correct} of ${results.length} sessions correct`}
      </p>
    </div>
  )
}
