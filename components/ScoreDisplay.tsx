interface ScoreDisplayProps {
  score: number
  questionIndex: number
  total: number
  attemptsRemaining: number
}

export default function ScoreDisplay({
  score,
  questionIndex,
  total,
  attemptsRemaining,
}: ScoreDisplayProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="text-sm font-medium text-muted-foreground">
        Question{' '}
        <span className="text-foreground font-bold">{questionIndex + 1}</span>
        {' / '}
        <span className="text-foreground">{total}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${
                i < attemptsRemaining ? 'bg-orange-400' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <div className="text-sm font-semibold">
          Score:{' '}
          <span className="text-primary">{score}</span>
        </div>
      </div>
    </div>
  )
}
