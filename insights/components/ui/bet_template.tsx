import React from 'react';

const BettingTips = () => {
  const meciuri = [
    {
      tara: 'Spania',
      competitie: 'La Liga',
      echipaAcasa: 'Real Madrid',
      echipaDepalsare: 'Barcelona',
      pronostic: '1X',
      cota: 1.65
    },
    {
      tara: 'Anglia',
      competitie: 'Premier League',
      echipaAcasa: 'Manchester United',
      echipaDepalsare: 'Liverpool',
      pronostic: 'Over 2.5',
      cota: 1.80
    }
  ];

  return (
    <div className="bg-black text-white p-8 font-mono" style={{width: '1600px', height: '900px'}}>
      {meciuri.map((meci, index) => (
        <div key={index} className="mb-16">
          <div className="text-xl font-bold mb-2">{meci.tara} - {meci.competitie}</div>
          <div className="text-2xl font-semibold mb-2">
            {meci.echipaAcasa} vs {meci.echipaDepalsare}
          </div>
          <div className="flex justify-between items-center text-xl">
            <span className="text-green-400">Pronostic: {meci.pronostic}</span>
            <span className="font-bold">@{meci.cota.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BettingTips;