import './stats.css'
import { bestStreak, currentStreak } from '../engine/streak'
import { summariseByMode, type ModeSummary } from '../engine/summary'
import { loadPracticeDays } from '../storage/days'
import { loadResults } from '../storage/stats'

const MODE_LABELS: Record<ModeSummary['mode'], string> = {
  flash: 'Flash count',
  countdown: 'Deck countdown',
  'true-count': 'True count',
}

const percent = (fraction: number) => `${Math.round(fraction * 100)}%`
const seconds = (ms: number) => `${(ms / 1000).toFixed(1)}s`

function ModeRow({ summary }: { summary: ModeSummary }) {
  return (
    <div className="stat">
      <strong>{MODE_LABELS[summary.mode]}</strong>
      {summary.runs === 0 ? (
        <span className="muted">No results yet</span>
      ) : (
        <span className="muted">
          {percent(summary.accuracy)} correct · last 10: {percent(summary.recentAccuracy)} · avg{' '}
          {seconds(summary.avgDurationMs)} · {summary.runs} answers
        </span>
      )}
    </div>
  )
}

/** Per-mode accuracy and timing, plus the practice streak. */
export function StatsView({ onHome }: { onHome: () => void }) {
  const results = loadResults()
  const days = loadPracticeDays(results)

  return (
    <div className="stack">
      <h2>Stats</h2>
      <div className="row">
        <div className="stat">
          <strong className="stat__value">{currentStreak(days, Date.now())}</strong>
          <span className="muted">Day streak</span>
        </div>
        <div className="stat">
          <strong className="stat__value">{bestStreak(days)}</strong>
          <span className="muted">Best streak</span>
        </div>
      </div>
      {summariseByMode(results).map((summary) => (
        <ModeRow key={summary.mode} summary={summary} />
      ))}
      <button className="btn" onClick={onHome}>
        Home
      </button>
    </div>
  )
}
