import { isCorrect, type RunResult } from '../storage/stats'

type Props = {
  result: RunResult
  onAgain: () => void
  onHome: () => void
}

/** Shows the outcome of a finished run. */
export function ResultView({ result, onAgain, onHome }: Props) {
  const correct = isCorrect(result)
  const seconds = (result.durationMs / 1000).toFixed(1)
  return (
    <div className="stack">
      <h2 className={correct ? 'good' : 'bad'}>{correct ? 'Correct!' : 'Not quite'}</h2>
      <p>
        You said <strong>{result.entered}</strong>, the count was <strong>{result.expected}</strong>.
      </p>
      <p className="muted">
        {result.cardCount} cards in {seconds}s
      </p>
      <button className="btn" onClick={onAgain}>
        Go again
      </button>
      <button className="btn btn--secondary" onClick={onHome}>
        Home
      </button>
    </div>
  )
}
