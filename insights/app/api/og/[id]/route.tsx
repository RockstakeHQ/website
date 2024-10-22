import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const meciuri = [
      {
        tara: 'Spania',
        competitie: 'La Liga',
        echipaAcasa: 'Dinamo',
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

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '1600px',
            height: '900px',
            backgroundColor: 'black',
            padding: '40px',
            gap: '32px',
          }}
        >
          {meciuri.map((meci, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '800px',
                gap: '16px',
                padding: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
              }}
            >
              <span
                style={{
                  color: 'white',
                  fontSize: '36px',
                  fontWeight: 'bold',
                }}
              >
                {meci.tara} - {meci.competitie}
              </span>
              
              <span
                style={{
                  color: 'white',
                  fontSize: '48px',
                  fontWeight: '600',
                }}
              >
                {meci.echipaAcasa} vs {meci.echipaDepalsare}
              </span>
              
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <span
                  style={{
                    color: 'rgb(74, 222, 128)',
                    fontWeight: 'bold',
                    fontSize: '36px',
                    backgroundColor: 'rgba(22, 101, 52, 0.3)',
                    padding: '8px 16px',
                    borderRadius: '4px',
                  }}
                >
                  {meci.pronostic}
                </span>
                
                <span
                  style={{
                    color: 'rgb(250, 204, 21)',
                    fontWeight: '900',
                    fontSize: '36px',
                    backgroundColor: 'rgba(161, 98, 7, 0.3)',
                    padding: '8px 16px',
                    borderRadius: '4px',
                  }}
                >
                  @{meci.cota.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ),
      {
        width: 1600,
        height: 900,
      }
    );
  } catch (e) {
    // console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}