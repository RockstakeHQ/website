// <style>
// @font-face {
//   font-family: 'Geist-SemiBold';
//   src: url('data:font/woff2;base64,${fs.readFileSync(path.join(process.cwd(), 'public/fonts/Geist-SemiBold.woff2')).toString('base64')}');
// }
// @font-face {
//   font-family: 'Geist-Regular';
//   src: url('data:font/woff2;base64,${fs.readFileSync(path.join(process.cwd(), 'public/fonts/Geist-Regular.woff2')).toString('base64')}');
// }
// </style>
// scripts/utils/imageGenerator.ts
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

interface MatchPrediction {
  competition: string;
  team1: string;
  team2: string;
  prediction: string;
  odds: number;
}

async function generatePredictionImage(
  matches: MatchPrediction[],
  width = 1200,
  height = 675
): Promise<Buffer> {
  const svgContent = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        @font-face {
          font-family: 'Geist-SemiBold';
          src: url('data:font/woff2;base64,${fs.readFileSync(path.join(process.cwd(), 'public/fonts/Geist-SemiBold.woff2')).toString('base64')}');
        }
        @font-face {
          font-family: 'Geist-Regular';
          src: url('data:font/woff2;base64,${fs.readFileSync(path.join(process.cwd(), 'public/fonts/Geist-Regular.woff2')).toString('base64')}');
        }
      </style>
    </defs>

    ${matches.map((match, index) => {
      const yOffset = height / 2 - (matches.length * 80) + index * 200; // Centrare verticală
      const xOffset = width / 2 - 760; // Centrare orizontală pentru lățimea de 1520px
      return `
        <g transform="translate(${xOffset}, ${yOffset})">
          <!-- Background Box -->
          <rect
            x="0"
            y="0"
            width="1520"
            height="150"
            fill="rgba(0, 0, 0, 0.75)"
            rx="8"
          />

          <!-- Competition Info -->
          <text 
            x="20" 
            y="40" 
            fill="#FFFFFF" 
            font-family="Geist-Regular" 
            font-size="24"
          >
            <tspan>${match.competition}</tspan>
          </text>

          <!-- Teams -->
          <text 
            x="20" 
            y="85" 
            fill="#FFFFFF" 
            font-family="Geist-SemiBold" 
            font-size="36"
          >${match.team1} vs ${match.team2}</text>

          <!-- Prediction Box -->
          <rect
            x="20"
            y="100"
            width="120"
            height="35"
            fill="rgba(0, 255, 0, 0.15)"
            rx="4"
          />
          <text 
            x="45" 
            y="125" 
            fill="#00FF00" 
            font-family="Geist-SemiBold" 
            font-size="24"
          >${match.prediction}</text>

          <!-- Odds Box -->
          <rect
            x="1380"
            y="100"
            width="120"
            height="35"
            fill="rgba(255, 215, 0, 0.15)"
            rx="4"
          />
          <text 
            x="1400" 
            y="125" 
            fill="#FFD700" 
            font-family="Geist-SemiBold" 
            font-size="24"
          >@${match.odds.toFixed(2)}</text>
        </g>
      `;
    }).join('')}
  </svg>
`;


  return await sharp(path.join(process.cwd(), 'assets', 'tips_background.png'))
    .resize(width, height, {
      fit: 'cover',
      position: 'center'
    })
    .modulate({
      brightness: 0.9,  // Mărit pentru a fi mai luminos
      saturation: 0.8,
      lightness: 1.1
    })
    .composite([
      {
        input: Buffer.from(svgContent),
        blend: 'over'
      }
    ])
    .png()
    .toBuffer();
}

async function generateThumbnailImage(
  matches: MatchPrediction[],
  width = 1200,
  height = 675,
): Promise<Buffer> {
  const svgContent = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @font-face {
            font-family: 'Geist-SemiBold';
            src: url('data:font/woff2;base64,${fs.readFileSync(path.join(process.cwd(), 'public/fonts/Geist-SemiBold.woff2')).toString('base64')}');
          }
        </style>
      </defs>

      ${matches.map((match, index) => {
        const yOffset = height/2 - (matches.length * 120) + (index * 240); // Centrăm vertical
        return `
          <!-- Match Box Container -->
          <g transform="translate(${width/2 - 600}, ${yOffset})">
            <!-- Background Box with Shadow Effect -->
            <rect
              x="0"
              y="0"
              width="1200"
              height="180"
              fill="rgba(0, 0, 0, 0.9)"
              rx="8"
            />

            <!-- Competition -->
            <text 
              x="40" 
              y="45" 
              fill="#FFFFFF" 
              font-family="Inter" 
              font-size="24"
            >${match.competition}</text>

            <!-- Teams -->
            <text 
              x="40" 
              y="95" 
              fill="#FFFFFF" 
              font-family="Inter-Bold" 
              font-size="40"
              letter-spacing="-0.5"
            >${match.team1} vs ${match.team2}</text>

            <!-- Prediction Container -->
            <rect
              x="40"
              y="115"
              width="100"
              height="36"
              fill="rgba(0, 255, 0, 0.15)"
              rx="4"
            />
            <!-- Prediction Text -->
            <text 
              x="55" 
              y="140" 
              fill="#00FF00" 
              font-family="Inter-Bold" 
              font-size="24"
            >${match.prediction}</text>

            <!-- Odds Container -->
            <rect
              x="1060"
              y="115"
              width="100"
              height="36"
              fill="rgba(255, 215, 0, 0.15)"
              rx="4"
            />
            <!-- Odds Text -->
            <text 
              x="1075" 
              y="140" 
              fill="#FFD700" 
              font-family="Inter-Bold" 
              font-size="24"
            >@${match.odds.toFixed(2)}</text>
          </g>
        `;
      }).join('')}
    </svg>
  `;

  return await sharp(path.join(process.cwd(), 'assets', 'tips_background.png'))
    .resize(width, height, {
      fit: 'cover',
      position: 'center'
    })
    .modulate({
      brightness: 0.9,
      saturation: 0.8,
      lightness: 1.1
    })
    .composite([
      {
        input: Buffer.from(svgContent),
        blend: 'over'
      }
    ])
    .png()
    .toBuffer();
}

export { generatePredictionImage, generateThumbnailImage };