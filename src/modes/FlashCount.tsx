import { useEffect, useState } from 'react'
import { AnswerForm } from '../components/AnswerForm'
import { CardView } from '../components/CardView'
import { OptionPicker } from '../components/OptionPicker'
import { ResultView } from '../components/ResultView'
import { buildShoe, shuffle, type Card } from '../engine/cards'
import { useAutoDeal } from '../hooks/useAutoDeal'
import type { RunResult } from '../storage/stats'
import { recordRun } from './recordRun'

const CARD_COUNT_OPTIONS = [10, 20, 30] as const
const SPEED_OPTIONS_MS = [500, 1000, 1500, 2000] as const
const DEFAULT_CARD_COUNT = 20
const DEFAULT_SPEED_MS = 1000

type Phase = 'setup' | 'playing' | 'answering' | 'result'

function Dealer({ cards, intervalMs, onDone }: DealerProps) {
  const index = useAutoDeal(cards.length, intervalMs, true)
  useEffect(() => {
    if (index >= cards.length) onDone()
  }, [index, cards.length, onDone])
  return index < cards.length ? <CardView key={index} card={cards[index]} /> : null
}

type DealerProps = { cards: Card[]; intervalMs: number; onDone: () => void }

/** Cards flash by at a set speed; afterwards the player states the running count. */
export function FlashCount({ onHome }: { onHome: () => void }) {
  const [cardCount, setCardCount] = useState(DEFAULT_CARD_COUNT)
  const [speedMs, setSpeedMs] = useState(DEFAULT_SPEED_MS)
  const [phase, setPhase] = useState<Phase>('setup')
  const [cards, setCards] = useState<Card[]>([])
  const [dealtMs, setDealtMs] = useState(0)
  const [startedAt, setStartedAt] = useState(0)
  const [result, setResult] = useState<RunResult | null>(null)

  function start() {
    setCards(shuffle(buildShoe(1)).slice(0, cardCount))
    setStartedAt(Date.now())
    setPhase('playing')
  }

  function finishDealing() {
    setDealtMs(Date.now() - startedAt)
    setPhase('answering')
  }

  function submit(entered: number) {
    setResult(recordRun({ mode: 'flash', cards, entered, durationMs: dealtMs }))
    setPhase('result')
  }

  if (phase === 'playing') {
    return <Dealer cards={cards} intervalMs={speedMs} onDone={finishDealing} />
  }
  if (phase === 'answering') return <AnswerForm prompt="Running count?" onSubmit={submit} />
  if (phase === 'result' && result) {
    return <ResultView result={result} onAgain={() => setPhase('setup')} onHome={onHome} />
  }

  return (
    <div className="stack">
      <h1>Flash count</h1>
      <OptionPicker label="Cards" options={CARD_COUNT_OPTIONS} selected={cardCount} onChange={setCardCount} />
      <OptionPicker
        label="Speed"
        options={SPEED_OPTIONS_MS}
        selected={speedMs}
        format={(ms) => `${ms / 1000}s`}
        onChange={setSpeedMs}
      />
      <button className="btn" onClick={start}>
        Start
      </button>
      <button className="btn btn--secondary" onClick={onHome}>
        Back
      </button>
    </div>
  )
}
