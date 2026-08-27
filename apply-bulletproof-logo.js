const fs = require('fs');
const path = require('path');

const logoPngPath = path.join(__dirname, 'assets', 'images', 'logo.png');
const logoJpgPath = path.join(__dirname, 'assets', 'images', 'logo.jpg');

const logoPngB64 = 'data:image/png;base64,' + fs.readFileSync(logoPngPath).toString('base64');
const logoJpgB64 = 'data:image/jpeg;base64,' + fs.readFileSync(logoJpgPath).toString('base64');

const indexPath = path.join(__dirname, 'index.html');
const cssPath = path.join(__dirname, 'styles.css');

let html = fs.readFileSync(indexPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Update index.html head with inline style and logo structure
const inlineCssTag = `<style>
.logo-img-wrapper {
    background-image: url("${logoPngB64}");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
</style>\n</head>`;

if (!html.includes('.logo-img-wrapper {')) {
    html = html.replace('</head>', inlineCssTag);
} else {
    html = html.replace(/<style>\s*\.logo-img-wrapper[\s\S]*?<\/style>/, `<style>\n.logo-img-wrapper {\n    background-image: url("${logoPngB64}");\n    background-size: cover;\n    background-position: center;\n    background-repeat: no-repeat;\n}\n</style>`);
}

// 2. Update brand-logo div in index.html
const oldLogoArea = /<div class="logo-img-wrapper"[\s\S]*?<\/div>/;
const newLogoArea = `<div class="logo-img-wrapper" style="background-image: url('assets/images/logo.png');">
                    <img src="assets/images/logo.png" alt="Narayana Hair Cutting Shop Logo" class="brand-logo-img" onerror="this.style.display='none';">
                </div>`;

html = html.replace(oldLogoArea, newLogoArea);

fs.writeFileSync(indexPath, html, 'utf8');

// 3. Update styles.css
if (!css.includes('background-image: url("assets/images/logo.png")')) {
    css = css.replace('.logo-img-wrapper {', `.logo-img-wrapper {\n    background-image: url("assets/images/logo.png");\n    background-size: cover;\n    background-position: center;\n    background-repeat: no-repeat;`);
    fs.writeFileSync(cssPath, css, 'utf8');
}

console.log('Bulletproof dual-layer logo configuration applied to index.html and styles.css!');
