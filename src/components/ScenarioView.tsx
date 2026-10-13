import type { TrueCountScenario } from '../engine/scenario'
import { formatSigned } from './formatSigned'

/** Displays the running count and decks remaining for a true count question. */
export function ScenarioView({ scenario }: { scenario: TrueCountScenario }) {
  return (
    <div className="row scenario">
      <div className="scenario__item">
        <span className="muted">Running count</span>
        <strong className="scenario__value">{formatSigned(scenario.runningCount)}</strong>
      </div>
      <div className="scenario__item">
        <span className="muted">Decks left</span>
        <strong className="scenario__value">{scenario.decksLeft}</strong>
      </div>
    </div>
  )
}
