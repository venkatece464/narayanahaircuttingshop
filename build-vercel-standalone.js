const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'images');

const logoPath = path.join(imgDir, 'logo.jpg');
const heroPath = path.join(imgDir, 'hero.jpg');
const dolluPath = path.join(imgDir, 'dollu_sannai.jpg');
const makeupPath = path.join(imgDir, 'barber_makeup.jpg');
const yanadiPath = path.join(imgDir, 'yanadi.jpg');
const venkatPath = path.join(imgDir, 'venkat.jpg');
const yanadiFullPath = path.join(imgDir, 'yanadi_full.jpg');
const venkatFullPath = path.join(imgDir, 'venkat_full.jpg');

console.log('Embedding all images directly into index.html & images-data.js for Vercel deployment...');

const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(logoPath).toString('base64');
const heroB64 = 'data:image/jpeg;base64,' + fs.readFileSync(heroPath).toString('base64');
const dolluB64 = 'data:image/jpeg;base64,' + fs.readFileSync(dolluPath).toString('base64');
const makeupB64 = 'data:image/jpeg;base64,' + fs.readFileSync(makeupPath).toString('base64');
const yanadiB64 = 'data:image/jpeg;base64,' + fs.readFileSync(yanadiPath).toString('base64');
const venkatB64 = 'data:image/jpeg;base64,' + fs.readFileSync(venkatPath).toString('base64');
const yanadiFullB64 = 'data:image/jpeg;base64,' + fs.readFileSync(yanadiFullPath).toString('base64');
const venkatFullB64 = 'data:image/jpeg;base64,' + fs.readFileSync(venkatFullPath).toString('base64');

// 1. Write images-data.js
const jsContent = `/* Auto-generated embedded fallback image data URIs for 100% Vercel deployment reliability */
window.EMBEDDED_IMAGES = {
    logo: "${logoB64}",
    hero: "${heroB64}",
    dollu: "${dolluB64}",
    makeup: "${makeupB64}",
    yanadi: "${yanadiB64}",
    venkat: "${venkatB64}",
    yanadi_full: "${yanadiFullB64}",
    venkat_full: "${venkatFullB64}"
};
`;
fs.writeFileSync(path.join(__dirname, 'images-data.js'), jsContent, 'utf8');

// 2. Create vercel.json
const vercelJson = {
    "version": 2,
    "cleanUrls": true,
    "headers": [
        {
            "source": "/assets/images/(.*)",
            "headers": [
                {
                    "key": "Cache-Control",
                    "value": "public, max-age=31536000, immutable"
                },
                {
                    "key": "Access-Control-Allow-Origin",
                    "value": "*"
                }
            ]
        }
    ]
};
fs.writeFileSync(path.join(__dirname, 'vercel.json'), JSON.stringify(vercelJson, null, 2), 'utf8');

console.log('Build completed for Vercel!');
