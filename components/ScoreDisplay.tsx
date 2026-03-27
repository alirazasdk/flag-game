interface ScoreDisplayProps {
  score: number
  questionIndex: number
  total: number
  attemptsRemaining: number
}

export default function ScoreDisplay({
  score,
  attemptsRemaining,
}: ScoreDisplayProps) {
  return (
    <div className="flex items-center justify-between w-full px-1">

      {/* Attempts */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium" style={{ color: 'rgba(199,210,254,0.7)' }}>Lives</span>
        <div className="flex gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className="text-base transition-all duration-300"
              style={{ opacity: i < attemptsRemaining ? 1 : 0.2, filter: i < attemptsRemaining ? 'none' : 'grayscale(1)' }}
            >
              ❤️
            </span>
          ))}
        </div>
      </div>

      {/* Score */}
      <div
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-full"
        style={{ background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)' }}
      >
        <span className="text-sm" style={{ color: 'rgba(199,210,254,0.8)' }}>Score</span>
        <span className="font-black text-base" style={{ color: '#f59e0b' }}>{score}</span>
      </div>
    </div>
  )
}
