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

// Definim calea către fonturi
const FONTS = {
  GEIST_REGULAR: fs.readFileSync(path.join(process.cwd(), 'public/fonts/Geist-Regular.woff2')),
  GEIST_BOLD: fs.readFileSync(path.join(process.cwd(), 'public/fonts/Geist-Bold.woff2')),
  GEIST_MONO_REGULAR: fs.readFileSync(path.join(process.cwd(), 'public/fonts/GeistMono-Regular.ttf')),
  GEIST_MONO_SEMIBOLD: fs.readFileSync(path.join(process.cwd(), 'public/fonts/GeistMono-SemiBold.ttf'))
};

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
            font-family: 'GeistMono-Regular';
            src: url('data:font/ttf;base64,${FONTS.GEIST_MONO_REGULAR.toString('base64')}');
          }
          @font-face {
            font-family: 'Geist-Bold';
            src: url('data:font/woff2;base64,${FONTS.GEIST_BOLD.toString('base64')}');
          }
          @font-face {
            font-family: 'GeistMono-SemiBold';
            src: url('data:font/ttf;base64,${FONTS.GEIST_MONO_SEMIBOLD.toString('base64')}');
          }
        </style>
        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0.8);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.9);stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background overlay -->
      <rect width="100%" height="100%" fill="url(#grad)"/>
      
      ${matches.map((match, index) => `
        <!-- Match ${index + 1} -->
        <g transform="translate(80, ${150 + index * 200})">
          <!-- Competition -->
          <text 
            x="0" 
            y="0" 
            fill="#999999" 
            font-family="GeistMono-Regular" 
            font-size="24px"
            letter-spacing="0.5px"
          >${match.competition}</text>
          
          <!-- Teams -->
          <text 
            x="0" 
            y="50" 
            fill="white" 
            font-family="Geist-Bold" 
            font-size="36px"
          >${match.team1} vs ${match.team2}</text>
          
          <!-- Prediction -->
          <text 
            x="0" 
            y="100" 
            fill="#4CAF50" 
            font-family="GeistMono-SemiBold" 
            font-size="32px"
            letter-spacing="0.5px"
          >${match.prediction}</text>
          
          <!-- Odds -->
          <text 
            x="${width - 180}" 
            y="100" 
            fill="#FFD700" 
            font-family="GeistMono-SemiBold" 
            font-size="32px"
            letter-spacing="0.5px"
          >@${match.odds.toFixed(2)}</text>
        </g>
      `).join('')}
    </svg>
  `;

  // Folosim imaginea de fundal din noua locație
  return await sharp(Buffer.from(svgContent))
    .composite([
      {
        input: path.join(process.cwd(), 'assets', 'tips_background.png'), // Noua cale către imagine
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
        <style>
          @font-face {
            font-family: 'Geist-Bold';
            src: url('data:font/woff2;base64,${FONTS.GEIST_BOLD.toString('base64')}');
          }
          @font-face {
            font-family: 'GeistMono-SemiBold';
            src: url('data:font/ttf;base64,${FONTS.GEIST_MONO_SEMIBOLD.toString('base64')}');
          }
        </style>
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
        font-family="Geist-Bold" 
        font-size="48px"
      >SUPER BILET ${matchCount} PONTURI</text>
      
      <!-- Total odds -->
      <text 
        x="50%" 
        y="${height/2 + 50}" 
        text-anchor="middle" 
        fill="#FFD700" 
        font-family="GeistMono-SemiBold" 
        font-size="72px"
        letter-spacing="1px"
      >COTĂ TOTALĂ: ${totalOdds.toFixed(2)}</text>
    </svg>
  `;

  return await sharp(Buffer.from(svgContent))
    .composite([
      {
        input: path.join(process.cwd(), 'assets', 'tips_background'),
        blend: 'overlay'
      }
    ])
    .png()
    .toBuffer();
}

export { generatePredictionImage, generateThumbnailImage };