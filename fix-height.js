const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const skip = ['index.html', 'home-2.html', 'login.html', 'signup.html'];

for (const file of files) {
    if (skip.includes(file)) continue;
    
    let html = fs.readFileSync(file, 'utf8');
    
    // Replace padding and min-height with fixed height and flexbox centering
    html = html.replace(/min-height:\s*auto;\s*padding:\s*200px\s*0\s*120px\s*0;\s*text-align:\s*center;/g, 
        'height: 450px; display: flex; flex-direction: column; justify-content: center; padding: 80px 0 0 0; text-align: center;');
    
    fs.writeFileSync(file, html);
    console.log(`Updated ${file}`);
}
