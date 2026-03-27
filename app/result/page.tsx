'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import LeaderboardTable from '@/components/LeaderboardTable'
import { getBrowserId } from '@/lib/browserId'
import { LeaderboardEntry } from '@/types'

function getGrade(score: number) {
  if (score === 100) return { emoji: '🏆', label: 'Perfect!',        color: '#f59e0b' }
  if (score >= 80)  return { emoji: '🌟', label: 'Excellent!',       color: '#f59e0b' }
  if (score >= 60)  return { emoji: '👍', label: 'Good Job!',        color: '#34d399' }
  if (score >= 40)  return { emoji: '📚', label: 'Keep Learning!',   color: '#fb923c' }
  return             { emoji: '💪', label: 'Keep Practicing!', color: '#f87171' }
}

function ResultContent() {
  const searchParams = useSearchParams()
  const score = parseInt(searchParams.get('score') ?? '0', 10)
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [browserId, setBrowserId] = useState('')

  useEffect(() => {
    setBrowserId(getBrowserId())
    fetch('/api/leaderboard')
      .then((r) => r.json())
      .then(setEntries)
      .catch(console.error)
  }, [])

  const grade = getGrade(score)

  return (
    <main className="game-bg flex items-center justify-center relative overflow-hidden p-4 py-8">
      {/* Decorative circles */}
      <div className="game-circle" style={{ width: 300, height: 300, top: -70, right: -70 }} />
      <div className="game-circle" style={{ width: 200, height: 200, bottom: -50, left: -60 }} />
      <div className="game-circle" style={{ width: 100, height: 100, top: '45%', left: -30 }} />

      <div className="relative z-10 w-full max-w-lg flex flex-col gap-5">

        {/* Score card */}
        <div
          className="rounded-3xl p-7 text-center animate-pop-in"
          style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          {/* Grade icon */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mx-auto mb-4"
            style={{ background: '#f59e0b', boxShadow: '0 8px 28px rgba(245,158,11,0.4)' }}
          >
            {grade.emoji}
          </div>

          {/* Grade label */}
          <p className="text-2xl font-black mb-1" style={{ color: grade.color }}>
            {grade.label}
          </p>

          {/* Score */}
          <div className="my-4">
            <span className="text-7xl font-black text-white leading-none">{score}</span>
            <span className="text-2xl font-semibold ml-1" style={{ color: 'rgba(199,210,254,0.7)' }}>/100</span>
          </div>

          <p className="text-sm mb-6" style={{ color: 'rgba(199,210,254,0.8)' }}>
            You got <span className="text-white font-bold">{score / 10}</span> out of{' '}
            <span className="text-white font-bold">10</span> flags correct
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/game"
              className="flex-1 py-3.5 rounded-2xl text-center font-bold text-base transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: 'white', color: '#1e35bf' }}
            >
              Play Again
            </Link>
            <Link
              href="/leaderboard"
              className="flex-1 py-3.5 rounded-2xl text-center font-semibold text-white text-base transition-all duration-200 hover:opacity-80"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.25)' }}
            >
              🏆 Full Leaderboard
            </Link>
          </div>
        </div>

        {/* Mini leaderboard */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-white font-bold text-lg">Top 10 Scores</h2>
          </div>
          <LeaderboardTable entries={entries} currentBrowserId={browserId} limit={10} />
        </div>
      </div>
    </main>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <main className="game-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-3 animate-float"
            style={{ background: '#f59e0b' }}>
            🏆
          </div>
          <p className="text-white font-semibold">Loading results…</p>
        </div>
      </main>
    }>
      <ResultContent />
    </Suspense>
  )
}
