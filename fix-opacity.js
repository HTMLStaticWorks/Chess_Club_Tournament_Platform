const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const skip = ['index.html', 'home-2.html', 'login.html', 'signup.html'];

for (const file of files) {
    if (skip.includes(file)) continue;
    
    let html = fs.readFileSync(file, 'utf8');
    
    // Increase height (padding)
    html = html.replace(/padding:\s*160px 0 80px 0;/g, 'padding: 200px 0 120px 0;');
    
    // Reduce opacity of bg color
    html = html.replace(/linear-gradient\(rgba\(15, 17, 23, 0\.85\), rgba\(15, 17, 23, 0\.95\)\)/g, 'linear-gradient(rgba(15, 17, 23, 0.5), rgba(15, 17, 23, 0.6))');
    
    fs.writeFileSync(file, html);
    console.log(`Updated ${file}`);
}
