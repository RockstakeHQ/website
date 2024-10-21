import React from 'react';
import Image from 'next/image';
import { geistSemiBold, geistBold, geistRegular, geistLight, geistBlack } from '@/app/fonts';
import backgroundImageBase64 from './betslip_background_base64';

const BettingTips: React.FC = () => {
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
      className={`text-white flex items-center justify-center bg-cover bg-center ${geistRegular.className}`}
      style={{
        width: '1600px',
        height: '900px',
        backgroundColor: '#000000',
        backgroundImage: `url(${backgroundImageBase64})`,
      }}
    >
      <div className="bg-black bg-opacity-80 p-10 rounded-lg shadow-lg max-w-4xl">
        {meciuri.map((meci, index) => (
          <React.Fragment key={index}>
            <div className="mb-8">
              <div className="flex items-center text-4xl mb-3">
                <Image src="/betslip/ball.svg" alt="Football" width={36} height={36} className="mr-3" />
                <span className={`${geistBold.className}`}>{meci.tara} - {meci.competitie}</span>
              </div>
              <div className={`text-5xl ${geistSemiBold.className} mb-4`}>
                {meci.echipaAcasa} vs {meci.echipaDepalsare}
              </div>
              <div className="flex justify-between items-center text-4xl">
                <span className={`text-green-400 ${geistBold.className} bg-green-900 bg-opacity-30 px-4 py-2 rounded`}>
                  {meci.pronostic}
                </span>
                <span className={`${geistBlack.className} text-yellow-400 bg-yellow-900 bg-opacity-30 px-4 py-2 rounded`}>
                  @{meci.cota.toFixed(2)}
                </span>
              </div>
            </div>
            {index < meciuri.length - 1 && (
              <hr className="border-t border-white opacity-20 my-6" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BettingTips;