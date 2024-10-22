// lib/supabase.ts
import { Match, PredictionGroup } from '@/types/predictions'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function createPredictionEntry(
  match: Match,
  predictionGroups: PredictionGroup[]
) {
  const { data: matchData, error: matchError } = await supabase
    .from('matches')
    .insert(match)
    .select()
    .single()

  if (matchError) throw matchError

  const groupsWithMatchId = predictionGroups.map(group => ({
    ...group,
    match_id: matchData.id
  }))

  const { data: groupsData, error: groupsError } = await supabase
    .from('prediction_groups')
    .insert(groupsWithMatchId)
    .select()

  if (groupsError) throw groupsError

  const predictions = predictionGroups.flatMap(group =>
    group.predictions.map(pred => ({
      ...pred,
      group_id: groupsData.find(g => g.id === group.id)?.id
    }))
  )

  const { error: predictionsError } = await supabase
    .from('predictions')
    .insert(predictions)

  if (predictionsError) throw predictionsError

  return matchData
}