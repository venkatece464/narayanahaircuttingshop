const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'images');

const heroPath = path.join(imgDir, 'hero.jpg');
const dolluPath = path.join(imgDir, 'dollu_sannai.jpg');
const makeupPath = path.join(imgDir, 'barber_makeup.jpg');

console.log('Reading image files...');

const heroB64 = 'data:image/jpeg;base64,' + fs.readFileSync(heroPath).toString('base64');
const dolluB64 = 'data:image/jpeg;base64,' + fs.readFileSync(dolluPath).toString('base64');
const makeupB64 = 'data:image/jpeg;base64,' + fs.readFileSync(makeupPath).toString('base64');

const jsContent = `/* Auto-generated embedded fallback image data URIs for 100% deployment reliability */
window.EMBEDDED_IMAGES = {
    hero: "${heroB64}",
    dollu: "${dolluB64}",
    makeup: "${makeupB64}"
};
`;

fs.writeFileSync(path.join(__dirname, 'images-data.js'), jsContent, 'utf8');
console.log('images-data.js generated successfully! Length:', jsContent.length);
