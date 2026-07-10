const fs = require('fs');
let c = fs.readFileSync('gallery.html', 'utf8');
let m = c.match(/<a href="index\.html" class="logo"[^>]*>[\s\S]*?<\/svg>/g);
console.log(m ? m : 'not found');
