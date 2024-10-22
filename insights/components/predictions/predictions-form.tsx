// components/predictions/prediction-form.tsx
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { calculateTotalOdds, Match, Prediction, PredictionGroup } from '@/types/predictions'
import { PredictionGroupCard } from './predictions-group-card'
export function PredictionForm() {
  const [match, setMatch] = useState<Match>({
    id: '',
    home_team: '',
    away_team: '',
    competition: '',
    match_date: '',
    status: 'pending'
  })

  const [predictionGroups, setPredictionGroups] = useState<PredictionGroup[]>([])

  const addPredictionGroup = (isSingle: boolean) => {
    const newGroup: PredictionGroup = {
      id: crypto.randomUUID(),
      match_id: match.id,
      is_single: isSingle,
      status: 'pending',
      predictions: []
    }
    setPredictionGroups([...predictionGroups, newGroup])
  }

  const addPrediction = (groupId: string) => {
    const newPrediction: Prediction = {
      id: crypto.randomUUID(),
      group_id: groupId,
      prediction_type: '',
      prediction_value: '',
      odds: 1,
      status: 'pending'
    }

    setPredictionGroups(groups =>
      groups.map(group =>
        group.id === groupId
          ? {
              ...group,
              predictions: [...group.predictions, newPrediction],
              total_odds: calculateTotalOdds([...group.predictions, newPrediction])
            }
          : group
      )
    )
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/predictions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          match,
          predictionGroups
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to save prediction')
      }
      
      // Handle success (e.g., redirect or show message)
    } catch (error) {
      console.error('Error saving prediction:', error)
      // Handle error (e.g., show error message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Detalii Meci</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Input
              placeholder="Echipa Gazdă"
              value={match.home_team}
              onChange={(e) => setMatch({...match, home_team: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <Input
              placeholder="Echipa Oaspete"
              value={match.away_team}
              onChange={(e) => setMatch({...match, away_team: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <Input
              placeholder="Competiție"
              value={match.competition}
              onChange={(e) => setMatch({...match, competition: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <Input
              type="datetime-local"
              value={match.match_date}
              onChange={(e) => setMatch({...match, match_date: e.target.value})}
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Pronosticuri</h2>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => addPredictionGroup(true)}
            >
              Adaugă Pronostic Single
            </Button>
            <Button
              variant="outline"
              onClick={() => addPredictionGroup(false)}
            >
              Adaugă Grup Pronosticuri
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {predictionGroups.map((group) => (
            <PredictionGroupCard
              key={group.id}
              group={group}
              onAddPrediction={() => addPrediction(group.id)}
              onUpdateGroup={(updatedGroup) => {
                setPredictionGroups(groups =>
                  groups.map(g => g.id === updatedGroup.id ? updatedGroup : g)
                )
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={handleSubmit}>
          Salvează ca Draft
        </Button>
        <Button onClick={handleSubmit}>
          Publică
        </Button>
      </div>
    </div>
  )
}