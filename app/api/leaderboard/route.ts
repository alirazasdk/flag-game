import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { data, error } = await getSupabase()
    .from('leaderboard')
    .select('id, browser_id, score, played_at')
    .order('score', { ascending: false })
    .limit(50)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const ranked = data.map((entry, i) => ({ ...entry, rank: i + 1 }))
  return NextResponse.json(ranked)
}
