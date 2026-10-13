import { useState } from 'react'
import { AnswerForm } from '../components/AnswerForm'
import { ScenarioView } from '../components/ScenarioView'
import { generateScenario } from '../engine/scenario'
import { saveResult } from '../storage/stats'
import { TrueCountFeedback } from './TrueCountFeedback'

const QUESTIONS_PER_SESSION = 10

type Phase = 'asking' | 'feedback' | 'summary'

/** A drill of quick questions: convert a running count and decks left into a true count. */
export function TrueCount({ onHome }: { onHome: () => void }) {
  const [scenario, setScenario] = useState(() => generateScenario())
  const [questionNumber, setQuestionNumber] = useState(1)
  const [phase, setPhase] = useState<Phase>('asking')
  const [entered, setEntered] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [shownAt, setShownAt] = useState(Date.now)

  const isLastQuestion = questionNumber >= QUESTIONS_PER_SESSION

  function submit(value: number) {
    const isRight = value === scenario.expected
    saveResult({
      mode: 'true-count',
      expected: scenario.expected,
      entered: value,
      durationMs: Date.now() - shownAt,
      playedAt: Date.now(),
    })
    setEntered(value)
    if (isRight) setCorrectCount((count) => count + 1)
    setPhase('feedback')
  }

  function next() {
    if (isLastQuestion) return setPhase('summary')
    setScenario(generateScenario())
    setQuestionNumber((number) => number + 1)
    setShownAt(Date.now())
    setPhase('asking')
  }

  function restart() {
    setScenario(generateScenario())
    setQuestionNumber(1)
    setCorrectCount(0)
    setShownAt(Date.now())
    setPhase('asking')
  }

  if (phase === 'summary') {
    return (
      <div className="stack">
        <h2>
          {correctCount} / {QUESTIONS_PER_SESSION} correct
        </h2>
        <button className="btn" onClick={restart}>
          Go again
        </button>
        <button className="btn btn--secondary" onClick={onHome}>
          Home
        </button>
      </div>
    )
  }

  return (
    <div className="stack">
      <p className="muted">
        Question {questionNumber} / {QUESTIONS_PER_SESSION}
      </p>
      <ScenarioView scenario={scenario} />
      {phase === 'asking' ? (
        <AnswerForm key={questionNumber} prompt="True count?" onSubmit={submit} />
      ) : (
        <TrueCountFeedback
          scenario={scenario}
          entered={entered}
          isLastQuestion={isLastQuestion}
          onNext={next}
        />
      )}
    </div>
  )
}
