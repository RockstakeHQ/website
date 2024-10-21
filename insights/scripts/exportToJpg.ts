import 'babel-plugin-transform-require-context';
import React from 'react';
import puppeteer from 'puppeteer';
import { renderToString } from 'react-dom/server';
import path from 'path';
import BettingTips from '../components/ui/bet_template';

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
  await page.waitForFunction(() => (document as any).fonts.ready);

  const outputPath = path.join(process.cwd(), 'public', 'betting-tips.jpg');
  await page.screenshot({ path: outputPath, type: 'jpeg', quality: 100 });

  await browser.close();
  console.log(`Imagine JPG generată cu succes: ${outputPath}`);
}

exportComponentToJpg().catch((error: Error) => {
  console.error('A apărut o eroare:', error);
  process.exit(1);
});