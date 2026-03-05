import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { browser_id, score } = body

  if (!browser_id || typeof score !== 'number') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  if (score < 0 || score > 100) {
    return NextResponse.json({ error: 'Score out of range' }, { status: 400 })
  }

  const { error } = await getSupabase()
    .from('leaderboard')
    .insert({ browser_id, score })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
