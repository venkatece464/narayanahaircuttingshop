const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
const logoPath = path.join(__dirname, 'assets', 'images', 'logo.jpg');

const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(logoPath).toString('base64');

let html = fs.readFileSync(indexPath, 'utf8');

// Embed logo directly into img src
const oldImgTag = /<img src="[^"]*" alt="Narayana Hair Cutting Shop Logo"[^>]*>/g;
const newImgTag = `<img src="${logoB64}" alt="Narayana Hair Cutting Shop Logo" class="brand-logo-img">`;

html = html.replace(oldImgTag, newImgTag);

// Also set inline LOGO_DATA script in head
if (!html.includes('window.INLINE_LOGO')) {
    const inlineScript = `<script>window.INLINE_LOGO = "${logoB64}";</script>\n</head>`;
    html = html.replace('</head>', inlineScript);
} else {
    html = html.replace(/<script>window\.INLINE_LOGO = "[^"]*";<\/script>/, `<script>window.INLINE_LOGO = "${logoB64}";</script>`);
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Logo successfully inlined directly into index.html for instant 100% Vercel load!');
