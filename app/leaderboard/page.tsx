'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import LeaderboardTable from '@/components/LeaderboardTable'
import { getBrowserId } from '@/lib/browserId'
import { LeaderboardEntry } from '@/types'

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [browserId, setBrowserId] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setBrowserId(getBrowserId())
    fetch('/api/leaderboard')
      .then((r) => r.json())
      .then((data) => {
        setEntries(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <main className="game-bg flex items-center justify-center relative overflow-hidden p-4 py-8">
      {/* Decorative circles */}
      <div className="game-circle" style={{ width: 300, height: 300, top: -70, right: -70 }} />
      <div className="game-circle" style={{ width: 180, height: 180, bottom: -40, left: -50 }} />
      <div className="game-circle" style={{ width: 100, height: 100, top: '50%', left: -30 }} />

      <div className="relative z-10 w-full max-w-2xl flex flex-col gap-5">

        {/* Header */}
        <div className="flex items-center justify-between px-1">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">🏆 Leaderboard</h1>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(199,210,254,0.75)' }}>Top 50 all-time scores</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-80"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            ← Home
          </Link>
        </div>

        {/* Table card */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          {loading ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mx-auto mb-3 animate-float"
                style={{ background: '#f59e0b' }}>
                🏆
              </div>
              <p className="text-white font-semibold">Loading scores…</p>
            </div>
          ) : (
            <LeaderboardTable entries={entries} currentBrowserId={browserId} />
          )}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            href="/game"
            className="px-10 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: 'white', color: '#1e35bf', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
          >
            Play Now →
          </Link>
        </div>
      </div>
    </main>
  )
}
