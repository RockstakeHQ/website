// components/predictions/prediction-group-card.tsx
import { Button } from '../ui/button'
import { PredictionCard } from './prediction-card'
import { calculateTotalOdds, PredictionGroup } from "@/types/predictions"

interface PredictionGroupCardProps {
  group: PredictionGroup
  onAddPrediction: () => void
  onUpdateGroup: (group: PredictionGroup) => void
}

export function PredictionGroupCard({ 
  group, 
  onAddPrediction, 
  onUpdateGroup 
}: PredictionGroupCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-medium">
            {group.is_single ? 'Pronostic Single' : 'Grup Pronosticuri'}
          </h3>
          {!group.is_single && (
            <p className="text-sm text-gray-500">
              Cotă totală: {group.total_odds?.toFixed(2)}
            </p>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddPrediction}
        >
          Adaugă Predicție
        </Button>
      </div>

      <div className="space-y-3">
        {group.predictions.map((prediction) => (
          <PredictionCard
            key={prediction.id}
            prediction={prediction}
            onUpdate={(updatedPrediction) => {
              const updatedPredictions = group.predictions.map(p =>
                p.id === updatedPrediction.id ? updatedPrediction : p
              )
              onUpdateGroup({
                ...group,
                predictions: updatedPredictions,
                total_odds: calculateTotalOdds(updatedPredictions)
              })
            }}
          />
        ))}
      </div>
    </div>
  )
}