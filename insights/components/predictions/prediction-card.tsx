// components/predictions/prediction-card.tsx
import { Input } from '../ui/input'
import { Prediction } from "@/types/predictions"

interface PredictionCardProps {
  prediction: Prediction
  onUpdate: (prediction: Prediction) => void
}

export function PredictionCard({ prediction, onUpdate }: PredictionCardProps) {
  return (
    <div className="flex gap-4 items-center">
      <Input
        placeholder="Tip predicție"
        value={prediction.prediction_type}
        onChange={(e) => onUpdate({
          ...prediction,
          prediction_type: e.target.value
        })}
      />
      <Input
        placeholder="Valoare predicție"
        value={prediction.prediction_value}
        onChange={(e) => onUpdate({
          ...prediction,
          prediction_value: e.target.value
        })}
      />
      <Input
        type="number"
        placeholder="Cotă"
        value={prediction.odds.toString()}
        onChange={(e) => onUpdate({
          ...prediction,
          odds: parseFloat(e.target.value) || 1
        })}
      />
    </div>
  )
}