import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardHeader className="pb-2">
          <div className="text-6xl mb-4">🌍</div>
          <CardTitle className="text-4xl font-bold tracking-tight">Flag Quiz</CardTitle>
          <CardDescription className="text-base mt-2">
            How well do you know the world&apos;s flags?
            <br />
            10 questions · 3 attempts each · Score up to 100 points
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 pt-4">
          <Link href="/game" className="w-full">
            <Button size="lg" className="w-full text-base font-semibold">
              Start Game
            </Button>
          </Link>
          <Link href="/leaderboard" className="w-full">
            <Button variant="outline" size="lg" className="w-full text-base">
              View Leaderboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}
