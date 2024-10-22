export interface Match {
    id: string;
    home_team: string;
    away_team: string;
    competition: string;
    match_date: string;
    status: 'pending' | 'in_progress' | 'completed';
    result?: string;
    home_score?: number;
    away_score?: number;
  }
  
  export interface PredictionGroup {
    id: string;
    match_id: string;
    is_single: boolean;
    description?: string;
    status: 'pending' | 'won' | 'lost' | 'partial';
    predictions: Prediction[];
    total_odds?: number; // Calculat pentru grupuri multiple
  }
  
  export interface Prediction {
    id: string;
    group_id: string;
    prediction_type: string;
    prediction_value: string;
    odds: number;
    status: 'pending' | 'won' | 'lost';
  }
  
  // Helper pentru calculul cotei totale
  export const calculateTotalOdds = (predictions: Prediction[]): number => {
    return predictions.reduce((total, pred) => total * pred.odds, 1);
  };