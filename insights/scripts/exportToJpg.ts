import React from 'react';
import puppeteer from 'puppeteer';
import { renderToString } from 'react-dom/server';
import path from 'path';
import { fileURLToPath } from 'url';
import BettingTips from '../components/ui/bet_template';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function exportComponentToJpg(): Promise<void> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const html = renderToString(React.createElement(BettingTips));
  
  await page.setContent(`
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { margin: 0; padding: 0; }
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `);
  
  await page.setViewport({ width: 1600, height: 900 });
  
  await page.evaluate(() => {
    return Promise.all([
      (document as any).fonts.ready,
      new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = document.querySelector('div')?.style.backgroundImage.slice(4, -1).replace(/"/g, "") || '';
      })
    ]);
  });
  
  const outputPath = path.join(process.cwd(), 'public', 'betting-tips.jpg');
  await page.screenshot({ path: outputPath, type: 'jpeg', quality: 100 });
  
  await browser.close();
  console.log(`Imagine JPG generată cu succes: ${outputPath}`);
}

exportComponentToJpg().catch((error: Error) => {
  console.error('A apărut o eroare:', error);
  process.exit(1);
});