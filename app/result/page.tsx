'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import LeaderboardTable from '@/components/LeaderboardTable'
import { getBrowserId } from '@/lib/browserId'
import { LeaderboardEntry } from '@/types'

function getGrade(score: number) {
  if (score === 100) return { emoji: '🏆', label: 'Perfect!', color: 'text-yellow-500' }
  if (score >= 80) return { emoji: '🌟', label: 'Excellent!', color: 'text-green-500' }
  if (score >= 60) return { emoji: '👍', label: 'Good job!', color: 'text-blue-500' }
  if (score >= 40) return { emoji: '📚', label: 'Keep learning!', color: 'text-orange-500' }
  return { emoji: '🌍', label: 'Keep practicing!', color: 'text-muted-foreground' }
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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-lg flex flex-col gap-6">
        {/* Score card */}
        <Card className="text-center shadow-xl">
          <CardHeader>
            <div className="text-6xl mb-2">{grade.emoji}</div>
            <CardTitle className={`text-3xl font-bold ${grade.color}`}>{grade.label}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-6xl font-black text-foreground">
              {score}
              <span className="text-2xl font-normal text-muted-foreground">/100</span>
            </p>
            <p className="text-muted-foreground text-sm">
              You answered {score / 10} out of 10 flags correctly
            </p>
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Link href="/game" className="flex-1">
                <Button className="w-full" size="lg">
                  Play Again
                </Button>
              </Link>
              <Link href="/leaderboard" className="flex-1">
                <Button variant="outline" className="w-full" size="lg">
                  Full Leaderboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Mini leaderboard */}
        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Top 10 Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <LeaderboardTable entries={entries} currentBrowserId={browserId} limit={10} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading results...</p>
      </main>
    }>
      <ResultContent />
    </Suspense>
  )
}
