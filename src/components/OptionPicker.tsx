type Props = {
  label: string
  options: readonly number[]
  selected: number
  format?: (option: number) => string
  onChange: (option: number) => void
}

/** Segmented single-choice control for small numeric option sets. */
export function OptionPicker({ label, options, selected, format, onChange }: Props) {
  return (
    <div className="stack stack--tight">
      <span className="muted">{label}</span>
      <div className="row">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={option === selected ? 'btn' : 'btn btn--secondary'}
            onClick={() => onChange(option)}
          >
            {format ? format(option) : option}
          </button>
        ))}
      </div>
    </div>
  )
}
