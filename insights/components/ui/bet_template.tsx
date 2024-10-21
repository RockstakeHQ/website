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
    <div 
      className="text-white font-mono flex items-center justify-center bg-cover bg-center"
      style={{
        width: '1600px', 
        height: '900px',
        backgroundImage: 'url("@/public/betslip_background.png")',
        backgroundColor: '#000'
      }}
    >
      <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-lg max-w-3xl">
        {meciuri.map((meci, index) => (
          <React.Fragment key={index}>
            <div className="mb-6">
              <div className="text-3xl font-bold mb-2">{meci.tara} - {meci.competitie}</div>
              <div className="text-4xl font-semibold mb-2">
                {meci.echipaAcasa} vs {meci.echipaDepalsare}
              </div>
              <div className="flex justify-between items-center text-3xl">
                <span className="text-green-400 font-bold">Pronostic: {meci.pronostic}</span>
                <span className="font-bold text-yellow-400">@{meci.cota.toFixed(2)}</span>
              </div>
            </div>
            {index < meciuri.length - 1 && (
              <hr className="border-t border-white opacity-20 my-4" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BettingTips;