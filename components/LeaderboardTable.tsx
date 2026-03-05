import { LeaderboardEntry } from '@/types'

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
  currentBrowserId?: string
  limit?: number
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function truncateId(id: string) {
  return id.slice(0, 8) + '...'
}

export default function LeaderboardTable({
  entries,
  currentBrowserId,
  limit,
}: LeaderboardTableProps) {
  const rows = limit ? entries.slice(0, limit) : entries

  if (rows.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No scores yet. Be the first to play!
      </p>
    )
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 border-b border-border">
            <th className="px-4 py-3 text-left font-semibold text-muted-foreground w-12">Rank</th>
            <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Player</th>
            <th className="px-4 py-3 text-right font-semibold text-muted-foreground">Score</th>
            <th className="px-4 py-3 text-right font-semibold text-muted-foreground hidden sm:table-cell">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((entry) => {
            const isMe = entry.browser_id === currentBrowserId
            return (
              <tr
                key={entry.id}
                className={`border-b border-border last:border-0 transition-colors ${
                  isMe ? 'bg-primary/10' : 'hover:bg-muted/30'
                }`}
              >
                <td className="px-4 py-3 font-bold text-muted-foreground">
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  {isMe ? (
                    <span className="text-primary font-semibold">You ({truncateId(entry.browser_id)})</span>
                  ) : (
                    truncateId(entry.browser_id)
                  )}
                </td>
                <td className="px-4 py-3 text-right font-bold text-foreground">{entry.score}</td>
                <td className="px-4 py-3 text-right text-muted-foreground hidden sm:table-cell">
                  {formatDate(entry.played_at)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
