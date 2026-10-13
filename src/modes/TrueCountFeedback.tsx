import { formatSigned } from '../components/formatSigned'
import type { TrueCountScenario } from '../engine/scenario'

type Props = {
  scenario: TrueCountScenario
  entered: number
  isLastQuestion: boolean
  onNext: () => void
}

/** Shows whether the answer was right, with the working. */
export function TrueCountFeedback({ scenario, entered, isLastQuestion, onNext }: Props) {
  const isRight = entered === scenario.expected
  const exactQuotient = (scenario.runningCount / scenario.decksLeft).toFixed(2)

  return (
    <div className="stack">
      <h2 className={isRight ? 'good' : 'bad'}>{isRight ? 'Correct!' : 'Not quite'}</h2>
      <p>
        {formatSigned(scenario.runningCount)} ÷ {scenario.decksLeft} decks = {exactQuotient}
      </p>
      <p>
        True count: <strong>{formatSigned(scenario.expected)}</strong>
        {!isRight && <span className="muted"> (you said {formatSigned(entered)})</span>}
      </p>
      <button className="btn" onClick={onNext} autoFocus>
        {isLastQuestion ? 'See results' : 'Next question'}
      </button>
    </div>
  )
}
