import { useState, type FormEvent } from 'react'

type Props = {
  prompt: string
  onSubmit: (value: number) => void
}

/** Numeric answer entry. Accepts negatives via a dedicated sign toggle for phone keypads. */
export function AnswerForm({ prompt, onSubmit }: Props) {
  const [text, setText] = useState('')
  const value = Number(text)
  const isValid = text.trim() !== '' && Number.isInteger(value)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (isValid) onSubmit(value)
  }

  function toggleSign() {
    setText((current) => (current.startsWith('-') ? current.slice(1) : `-${current}`))
  }

  return (
    <form className="stack" onSubmit={handleSubmit}>
      <h2>{prompt}</h2>
      <div className="row">
        <button type="button" className="btn btn--secondary" onClick={toggleSign}>
          ±
        </button>
        <input
          className="input"
          type="text"
          inputMode="numeric"
          autoFocus
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </div>
      <button className="btn" type="submit" disabled={!isValid}>
        Check
      </button>
    </form>
  )
}
