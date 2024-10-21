import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateHtml() {
  // Load background image as base64
  const backgroundImagePath = path.join(__dirname, '../public/betslip/background.png');
  const backgroundImage = await fs.readFile(backgroundImagePath, { encoding: 'base64' });

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

  const meciuriHtml = meciuri.map((meci, index) => `
    <div class="mb-8">
      <div class="flex items-center text-4xl mb-3">
        <img src="data:image/svg+xml;base64,..." alt="Football" class="w-9 h-9 mr-3" />
        <span class="font-bold">${meci.tara} - ${meci.competitie}</span>
      </div>
      <div class="text-5xl font-semibold mb-4">
        ${meci.echipaAcasa} vs ${meci.echipaDepalsare}
      </div>
      <div class="flex justify-between items-center text-4xl">
        <span class="text-green-400 font-bold bg-green-900 bg-opacity-30 px-4 py-2 rounded">
          ${meci.pronostic}
        </span>
        <span class="font-black text-yellow-400 bg-yellow-900 bg-opacity-30 px-4 py-2 rounded">
          @${meci.cota.toFixed(2)}
        </span>
      </div>
    </div>
    ${index < meciuri.length - 1 ? '<hr class="border-t border-white opacity-20 my-6" />' : ''}
  `).join('');

  return `
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { margin: 0; padding: 0; font-family: sans-serif; }
        </style>
      </head>
      <body>
        <div class="text-white flex items-center justify-center bg-cover bg-center"
             style="width: 1600px; height: 900px; background-color: #000000; background-image: url(data:image/png;base64,${backgroundImage});">
          <div class="bg-black bg-opacity-80 p-10 rounded-lg shadow-lg max-w-4xl">
            ${meciuriHtml}
          </div>
        </div>
      </body>
    </html>
  `;
}

async function exportComponentToJpg() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const html = await generateHtml();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.setViewport({ width: 1600, height: 900 });

  const outputPath = path.join(process.cwd(), 'public', 'betting-tips.jpg');
  await page.screenshot({ path: outputPath, type: 'jpeg', quality: 100 });

  await browser.close();
  console.log(`Imagine JPG generată cu succes: ${outputPath}`);
}

exportComponentToJpg().catch((error) => {
  console.error('A apărut o eroare:', error);
  process.exit(1);
});