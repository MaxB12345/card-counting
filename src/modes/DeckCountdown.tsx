import { useState } from 'react'
import { AnswerForm } from '../components/AnswerForm'
import { CardView } from '../components/CardView'
import { ResultView } from '../components/ResultView'
import { buildShoe, shuffle, type Card } from '../engine/cards'
import type { RunResult } from '../storage/stats'
import { recordRun } from './recordRun'

type Phase = 'playing' | 'answering' | 'result'

function newDeck(): Card[] {
  return shuffle(buildShoe(1))
}

/** Self-paced run through one full deck. A correct final count is always 0. */
export function DeckCountdown({ onHome }: { onHome: () => void }) {
  const [deck, setDeck] = useState(newDeck)
  const [position, setPosition] = useState(0)
  const [startedAt, setStartedAt] = useState(Date.now)
  const [durationMs, setDurationMs] = useState(0)
  const [phase, setPhase] = useState<Phase>('playing')
  const [result, setResult] = useState<RunResult | null>(null)

  function restart() {
    setDeck(newDeck())
    setPosition(0)
    setStartedAt(Date.now())
    setPhase('playing')
  }

  function next() {
    if (position + 1 < deck.length) return setPosition(position + 1)
    setDurationMs(Date.now() - startedAt)
    setPhase('answering')
  }

  function submit(entered: number) {
    setResult(recordRun({ mode: 'countdown', cards: deck, entered, durationMs }))
    setPhase('result')
  }

  if (phase === 'answering') return <AnswerForm prompt="Final count?" onSubmit={submit} />
  if (phase === 'result' && result) {
    return <ResultView result={result} onAgain={restart} onHome={onHome} />
  }

  return (
    <div className="stack">
      <p className="muted">
        {position + 1} / {deck.length}
      </p>
      <CardView card={deck[position]} />
      <button className="btn" onClick={next}>
        Next card
      </button>
    </div>
  )
}
