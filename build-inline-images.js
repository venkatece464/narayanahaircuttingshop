const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'images');

const heroPath = path.join(imgDir, 'hero.jpg');
const dolluPath = path.join(imgDir, 'dollu_sannai.jpg');
const makeupPath = path.join(imgDir, 'barber_makeup.jpg');
const yanadiPath = path.join(imgDir, 'yanadi.jpg');
const venkatPath = path.join(imgDir, 'venkat.jpg');
const yanadiFullPath = path.join(imgDir, 'yanadi_full.jpg');
const venkatFullPath = path.join(imgDir, 'venkat_full.jpg');
const marriageMelamPath = path.join(imgDir, 'marriage_melam.jpg');
const gruhaPath = path.join(imgDir, 'gruhapravesham_melam.jpg');
const lastRitesPath = path.join(imgDir, 'last_rites_melam.jpg');
const festivalPath = path.join(imgDir, 'festival_melam.jpg');

console.log('Reading image files including full owner photos and all ceremony photos...');

const heroB64 = 'data:image/jpeg;base64,' + fs.readFileSync(heroPath).toString('base64');
const dolluB64 = 'data:image/jpeg;base64,' + fs.readFileSync(dolluPath).toString('base64');
const makeupB64 = 'data:image/jpeg;base64,' + fs.readFileSync(makeupPath).toString('base64');
const yanadiB64 = 'data:image/jpeg;base64,' + fs.readFileSync(yanadiPath).toString('base64');
const venkatB64 = 'data:image/jpeg;base64,' + fs.readFileSync(venkatPath).toString('base64');
const yanadiFullB64 = 'data:image/jpeg;base64,' + fs.readFileSync(yanadiFullPath).toString('base64');
const venkatFullB64 = 'data:image/jpeg;base64,' + fs.readFileSync(venkatFullPath).toString('base64');
const marriageMelamB64 = 'data:image/jpeg;base64,' + fs.readFileSync(marriageMelamPath).toString('base64');
const gruhaB64 = 'data:image/jpeg;base64,' + fs.readFileSync(gruhaPath).toString('base64');
const lastRitesB64 = 'data:image/jpeg;base64,' + fs.readFileSync(lastRitesPath).toString('base64');
const festivalB64 = 'data:image/jpeg;base64,' + fs.readFileSync(festivalPath).toString('base64');

const jsContent = `/* Auto-generated embedded fallback image data URIs for 100% deployment reliability */
window.EMBEDDED_IMAGES = {
    hero: "${heroB64}",
    dollu: "${dolluB64}",
    makeup: "${makeupB64}",
    yanadi: "${yanadiB64}",
    venkat: "${venkatB64}",
    yanadi_full: "${yanadiFullB64}",
    venkat_full: "${venkatFullB64}",
    marriage_melam: "${marriageMelamB64}",
    gruhapravesham_melam: "${gruhaB64}",
    last_rites_melam: "${lastRitesB64}",
    festival_melam: "${festivalB64}"
};
`;

fs.writeFileSync(path.join(__dirname, 'images-data.js'), jsContent, 'utf8');
console.log('images-data.js generated successfully! Length:', jsContent.length);
