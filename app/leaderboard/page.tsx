'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">🏆 Leaderboard</h1>
          <Link href="/">
            <Button variant="outline" size="sm">
              ← Home
            </Button>
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-muted-foreground font-normal">
              Top 50 all-time scores
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-muted-foreground py-8">Loading scores...</p>
            ) : (
              <LeaderboardTable entries={entries} currentBrowserId={browserId} />
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Link href="/game">
            <Button size="lg" className="px-8">
              Play Now
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
