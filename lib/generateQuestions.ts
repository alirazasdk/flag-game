import { Country, Question } from '@/types'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function generateQuestions(countries: Country[], count = 10): Question[] {
  const shuffled = shuffle(countries)
  const selected = shuffled.slice(0, count)

  return selected.map((correct) => {
    const pool = countries.filter((c) => c.id !== correct.id)
    const distractors = shuffle(pool).slice(0, 3)
    const options = shuffle([correct, ...distractors])
    return { correct, options }
  })
}
