// scripts/utils/imageGenerator.ts
import sharp from 'sharp';
import path from 'path';

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
  // Creăm un SVG cu conținutul dorit
  const svgContent = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0.8);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.9);stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background overlay -->
      <rect width="100%" height="100%" fill="url(#grad)"/>
      
      ${matches.map((match, index) => `
        <!-- Match ${index + 1} -->
        <g transform="translate(100, ${150 + index * 200})">
          <!-- Competition -->
          <text 
            x="0" 
            y="0" 
            fill="#999999" 
            font-family="Arial" 
            font-size="24px"
          >${match.competition}</text>
          
          <!-- Teams -->
          <text 
            x="0" 
            y="50" 
            fill="white" 
            font-family="Arial" 
            font-size="36px" 
            font-weight="bold"
          >${match.team1} vs ${match.team2}</text>
          
          <!-- Prediction -->
          <text 
            x="0" 
            y="100" 
            fill="#4CAF50" 
            font-family="Arial" 
            font-size="32px" 
            font-weight="bold"
          >${match.prediction}</text>
          
          <!-- Odds -->
          <text 
            x="${width - 200}" 
            y="100" 
            fill="#FFD700" 
            font-family="Arial" 
            font-size="32px" 
            font-weight="bold"
          >@${match.odds.toFixed(2)}</text>
        </g>
      `).join('')}
    </svg>
  `;

  // Creăm imaginea finală
  return await sharp(Buffer.from(svgContent))
    .composite([
      {
        input: path.join(process.cwd(), 'assets', 'stadium-bg.jpg'),
        blend: 'overlay'
      }
    ])
    .png()
    .toBuffer();
}

async function generateThumbnailImage(
  totalOdds: number,
  matchCount: number,
  width = 1200,
  height = 675
): Promise<Buffer> {
  const svgContent = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0.7);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.85);stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background overlay -->
      <rect width="100%" height="100%" fill="url(#grad)"/>
      
      <!-- Title -->
      <text 
        x="50%" 
        y="${height/2 - 50}" 
        text-anchor="middle" 
        fill="white" 
        font-family="Arial" 
        font-size="48px" 
        font-weight="bold"
      >SUPER BILET ${matchCount} PONTURI</text>
      
      <!-- Total odds -->
      <text 
        x="50%" 
        y="${height/2 + 50}" 
        text-anchor="middle" 
        fill="#FFD700" 
        font-family="Arial" 
        font-size="72px" 
        font-weight="bold"
      >COTĂ TOTALĂ: ${totalOdds.toFixed(2)}</text>
    </svg>
  `;

  return await sharp(Buffer.from(svgContent))
    .composite([
      {
        input: path.join(process.cwd(), 'assets', 'stadium-bg.jpg'),
        blend: 'overlay'
      }
    ])
    .png()
    .toBuffer();
}

export { generatePredictionImage, generateThumbnailImage };