import { currentStreak, practisedToday } from '../engine/streak'
import { loadPracticeDays } from '../storage/days'
import { loadResults } from '../storage/stats'

type Props = {
  onStartFlash: () => void
  onStartCountdown: () => void
  onStartTrueCount: () => void
  onStats: () => void
}

function streakLine(days: readonly string[], now: number): string {
  const streak = currentStreak(days, now)
  const status = practisedToday(days, now) ? 'Practised today ✓' : 'Not practised yet today'
  return streak === 0 ? status : `${streak} day streak · ${status}`
}

/** Mode picker with the daily streak. */
export function Home({ onStartFlash, onStartCountdown, onStartTrueCount, onStats }: Props) {
  const days = loadPracticeDays(loadResults())

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
      <button className="btn" onClick={onStartTrueCount}>
        True count
      </button>
      <button className="btn btn--secondary" onClick={onStats}>
        Stats
      </button>
      <p className="muted">{streakLine(days, Date.now())}</p>
    </div>
  )
}
