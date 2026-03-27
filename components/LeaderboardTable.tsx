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
  return id.slice(0, 8) + '…'
}

const RANK_ICON: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }

export default function LeaderboardTable({
  entries,
  currentBrowserId,
  limit,
}: LeaderboardTableProps) {
  const rows = limit ? entries.slice(0, limit) : entries

  if (rows.length === 0) {
    return (
      <div className="text-center py-10 px-4">
        <div className="text-4xl mb-3">🌍</div>
        <p className="font-semibold text-white">No scores yet.</p>
        <p className="text-sm mt-1" style={{ color: 'rgba(199,210,254,0.6)' }}>Be the first to play!</p>
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'rgba(199,210,254,0.6)' }}>Rank</th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'rgba(199,210,254,0.6)' }}>Player</th>
            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'rgba(199,210,254,0.6)' }}>Score</th>
            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider hidden sm:table-cell"
              style={{ color: 'rgba(199,210,254,0.6)' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((entry) => {
            const isMe = entry.browser_id === currentBrowserId
            const rankIcon = RANK_ICON[entry.rank]
            return (
              <tr
                key={entry.id}
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  background: isMe ? 'rgba(245,158,11,0.15)' : undefined,
                }}
              >
                <td className="px-5 py-3 font-bold text-base">
                  {rankIcon ? (
                    <span>{rankIcon}</span>
                  ) : (
                    <span style={{ color: 'rgba(199,210,254,0.6)' }}>#{entry.rank}</span>
                  )}
                </td>
                <td className="px-5 py-3 font-mono text-xs">
                  {isMe ? (
                    <span className="font-bold" style={{ color: '#f59e0b' }}>
                      ★ You ({truncateId(entry.browser_id)})
                    </span>
                  ) : (
                    <span style={{ color: 'rgba(199,210,254,0.7)' }}>{truncateId(entry.browser_id)}</span>
                  )}
                </td>
                <td className="px-5 py-3 text-right font-black text-white">{entry.score}</td>
                <td className="px-5 py-3 text-right hidden sm:table-cell text-xs"
                  style={{ color: 'rgba(199,210,254,0.5)' }}>
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
