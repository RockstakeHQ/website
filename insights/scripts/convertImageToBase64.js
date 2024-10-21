const fs = require('fs');
const path = require('path');

// Funcție pentru a converti imaginea în Base64
function convertImageToBase64(imagePath) {
  // Citește fișierul imagine
  const image = fs.readFileSync(imagePath);
  // Convertește imaginea în Base64
  return Buffer.from(image).toString('base64');
}

// Obține calea absolută a directorului curent al scriptului
const currentDir = __dirname;

// Calea către imaginea dvs. (ajustați această cale în funcție de structura proiectului dvs.)
const imagePath = path.join(currentDir, '..', 'public/betslip', 'background.png');

// Verifică dacă fișierul imagine există
if (!fs.existsSync(imagePath)) {
  console.error(`Eroare: Fișierul imagine nu a fost găsit la calea ${imagePath}`);
  process.exit(1);
}

// Obține extensia fișierului
const fileExtension = path.extname(imagePath).slice(1);

// Convertește imaginea în Base64
const base64Image = convertImageToBase64(imagePath);

// Creează conținutul fișierului TypeScript
const tsContent = `
const backgroundImageBase64 = 'data:image/${fileExtension};base64,${base64Image}';

export default backgroundImageBase64;
`;

// Scrie conținutul în fișierul TypeScript
const outputPath = path.join(currentDir, '..', 'components', 'ui', 'betslip_background_base64.ts');
fs.writeFileSync(outputPath, tsContent);

console.log(`Fișierul TypeScript a fost generat cu succes: ${outputPath}`);