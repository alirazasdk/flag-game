export interface Country {
  id: string
  name: string
  code: string
  flag_url: string
}

export interface Question {
  correct: Country
  options: Country[]
}

export interface LeaderboardEntry {
  id: string
  browser_id: string
  score: number
  played_at: string
  rank?: number
}

export type GamePhase = 'playing' | 'answered' | 'revealed'
