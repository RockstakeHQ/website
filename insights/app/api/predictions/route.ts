import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // folosim service role key pentru operații din API
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        prediction_groups (
          *,
          predictions (*)
        )
      `)
      .order('match_date', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch predictions' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const { match, predictionGroups } = await req.json()

    // Start a transaction
    const { data: matchData, error: matchError } = await supabase
      .from('matches')
      .insert(match)
      .select()
      .single()

    if (matchError) throw matchError

    const groupsWithMatchId = predictionGroups.map((group: any) => ({
      ...group,
      match_id: matchData.id
    }))

    const { data: groupsData, error: groupsError } = await supabase
      .from('prediction_groups')
      .insert(groupsWithMatchId)
      .select()

    if (groupsError) throw groupsError

    const predictions = predictionGroups.flatMap((group: { predictions: any[]; id: any }) =>
      group.predictions.map((pred: any) => ({
        ...pred,
        group_id: groupsData.find(g => g.id === group.id)?.id
      }))
    )

    const { error: predictionsError } = await supabase
      .from('predictions')
      .insert(predictions)

    if (predictionsError) throw predictionsError

    return NextResponse.json(matchData)
  } catch (error) {
    console.error('Error creating prediction:', error)
    return NextResponse.json(
      { error: 'Failed to create prediction' },
      { status: 500 }
    )
  }
}