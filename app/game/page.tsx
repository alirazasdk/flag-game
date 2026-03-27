'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
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
  const [, setSelectedAnswer] = useState<string | null>(null)
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

  const submitScore = useCallback(async (finalScore: number) => {
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
  }, [])

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
      if (newAttempts <= 0) setPhase('revealed')
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
      <main className="game-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 animate-float"
            style={{ background: '#f59e0b' }}>
            🌍
          </div>
          <p className="text-white font-semibold text-lg">Loading flags…</p>
          <p style={{ color: 'rgba(199,210,254,0.7)' }} className="text-sm mt-1">Preparing your quiz</p>
        </div>
      </main>
    )
  }

  if (!current) return null

  const progress = (currentIndex / TOTAL_QUESTIONS) * 100

  return (
    <main className="game-bg flex items-center justify-center relative overflow-hidden p-4 py-8">
      {/* Decorative circles */}
      <div className="game-circle" style={{ width: 280, height: 280, top: -70, right: -70 }} />
      <div className="game-circle" style={{ width: 180, height: 180, bottom: -30, left: -50 }} />

      <div className="relative z-10 w-full max-w-lg flex flex-col gap-5">

        {/* Header */}
        <div className="flex items-center justify-between px-1">
          <span className="text-white font-black text-xl tracking-tight">Flag Quiz</span>
          <span className="text-sm font-semibold px-3 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(199,210,254,0.9)' }}>
            {currentIndex + 1} / {TOTAL_QUESTIONS}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: '#f59e0b' }}
          />
        </div>

        {/* Score display */}
        <ScoreDisplay
          score={score}
          questionIndex={currentIndex}
          total={TOTAL_QUESTIONS}
          attemptsRemaining={attemptsRemaining}
        />

        {/* White content card */}
        <div className="rounded-3xl overflow-hidden flex flex-col gap-5 p-5"
          style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>

          {/* Flag */}
          <FlagCard
            flagUrl={current.correct.flag_url}
            countryName={current.correct.name}
            revealed={phase === 'revealed'}
          />

          {/* Question label */}
          {phase === 'playing' && (
            <p className="text-center text-sm font-medium" style={{ color: 'rgba(199,210,254,0.85)' }}>
              Which country does this flag belong to?
            </p>
          )}

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
          <div className="flex gap-2 pt-1">
            {phase === 'playing' && (
              <button
                onClick={handleReveal}
                className="flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80"
                style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(199,210,254,0.9)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                Reveal Answer
              </button>
            )}
            {phase !== 'playing' && (
              <button
                className="flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: 'white', color: '#1e35bf' }}
                onClick={() => goNext(score)}
              >
                {currentIndex + 1 >= TOTAL_QUESTIONS ? '🏁 See Results' : 'Next Question →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
