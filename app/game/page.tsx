'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import FlagCard from '@/components/FlagCard'
import OptionButton from '@/components/OptionButton'
import ScoreDisplay from '@/components/ScoreDisplay'
import { generateQuestions } from '@/lib/generateQuestions'
import { getBrowserId } from '@/lib/browserId'
import { Country, GamePhase, Question } from '@/types'

const MAX_ATTEMPTS = 3
const TOTAL_QUESTIONS = 10

export default function GamePage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [attemptsRemaining, setAttemptsRemaining] = useState(MAX_ATTEMPTS)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [phase, setPhase] = useState<GamePhase>('playing')
  const [loading, setLoading] = useState(true)
  const [wrongAnswers, setWrongAnswers] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/countries')
        const countries: Country[] = await res.json()
        const qs = generateQuestions(countries, TOTAL_QUESTIONS)
        setQuestions(qs)
      } catch (e) {
        console.error('Failed to load countries', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const current = questions[currentIndex]

  const submitScore = useCallback(
    async (finalScore: number) => {
      const browserId = getBrowserId()
      try {
        await fetch('/api/submit-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ browser_id: browserId, score: finalScore }),
        })
      } catch (e) {
        console.error('Failed to submit score', e)
      }
    },
    []
  )

  function goNext(finalScore: number) {
    if (currentIndex + 1 >= TOTAL_QUESTIONS) {
      submitScore(finalScore).then(() => {
        router.push(`/result?score=${finalScore}`)
      })
      return
    }
    setCurrentIndex((i) => i + 1)
    setAttemptsRemaining(MAX_ATTEMPTS)
    setSelectedAnswer(null)
    setPhase('playing')
    setWrongAnswers(new Set())
  }

  function handleAnswer(country: Country) {
    if (phase !== 'playing') return

    const isCorrect = country.id === current.correct.id

    if (isCorrect) {
      const newScore = score + 10
      setScore(newScore)
      setSelectedAnswer(country.id)
      setPhase('answered')
    } else {
      const newWrong = new Set(wrongAnswers).add(country.id)
      setWrongAnswers(newWrong)
      const newAttempts = attemptsRemaining - 1
      setAttemptsRemaining(newAttempts)
      if (newAttempts <= 0) {
        setPhase('revealed')
      }
    }
  }

  function handleReveal() {
    setPhase('revealed')
  }

  function getOptionState(country: Country) {
    if (phase === 'playing') {
      return wrongAnswers.has(country.id) ? 'wrong' : 'default'
    }
    if (phase === 'answered') {
      if (country.id === current.correct.id) return 'correct'
      return wrongAnswers.has(country.id) ? 'wrong' : 'disabled'
    }
    // revealed
    if (country.id === current.correct.id) return 'correct'
    return wrongAnswers.has(country.id) ? 'wrong' : 'disabled'
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">🌍</div>
          <p className="text-muted-foreground">Loading flags...</p>
        </div>
      </main>
    )
  }

  if (!current) return null

  const progress = ((currentIndex) / TOTAL_QUESTIONS) * 100

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardContent className="p-6 flex flex-col gap-6">
          {/* Progress */}
          <Progress value={progress} className="h-2" />

          {/* Score + counter */}
          <ScoreDisplay
            score={score}
            questionIndex={currentIndex}
            total={TOTAL_QUESTIONS}
            attemptsRemaining={attemptsRemaining}
          />

          {/* Flag */}
          <FlagCard
            flagUrl={current.correct.flag_url}
            countryName={current.correct.name}
            revealed={phase === 'revealed'}
          />

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {current.options.map((country) => (
              <OptionButton
                key={country.id}
                label={country.name}
                state={getOptionState(country) as any}
                onClick={() => handleAnswer(country)}
              />
            ))}
          </div>

          {/* Reveal & Next */}
          <div className="flex gap-2">
            {phase === 'playing' && (
              <Button
                variant="ghost"
                className="flex-1 text-muted-foreground"
                onClick={handleReveal}
              >
                Reveal Answer
              </Button>
            )}
            {phase !== 'playing' && (
              <Button className="flex-1" onClick={() => goNext(score)}>
                {currentIndex + 1 >= TOTAL_QUESTIONS ? 'See Results' : 'Next Question →'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
