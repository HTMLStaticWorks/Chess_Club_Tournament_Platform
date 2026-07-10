const fs = require('fs');

// Task 1: index.html home1 hero section button color should be website color
let html1 = fs.readFileSync('index.html', 'utf8');
html1 = html1.replace('<a href="tournaments.html" class="btn btn-secondary">Explore Tournaments</a>', '<a href="tournaments.html" class="btn btn-primary">Explore Tournaments</a>');
html1 = html1.replace('<a href="coaching.html" class="btn btn-secondary">Join Our Ranks</a>', '<a href="coaching.html" class="btn btn-primary">Join Our Ranks</a>');
fs.writeFileSync('index.html', html1);
console.log('Fixed index.html');

// Task 2: home-2.html page hero section content color black in light mode add bg color for hero section
// Task 3: home-2.html page Foundation Pathways section icon color should be website color
let html2 = fs.readFileSync('home-2.html', 'utf8');

// Add background color to hero section
html2 = html2.replace('<section class="hero" id="hero-home2">', '<section class="hero" id="hero-home2" style="background-color: var(--bg-secondary);">');

// Add inline style to override the white color for #hero-home2 text
if (!html2.includes('#hero-home2 h1')) {
    html2 = html2.replace('</head>', `    <style>
        #hero-home2 h1, #hero-home2 p {
            color: var(--text-primary) !important;
        }
    </style>
</head>`);
}

// Make sure icons in the training academy section are explicitly var(--accent-primary)
// The user might mean the check-circle icons.
const trainingSectionStart = html2.indexOf('<section id="training-academy-home">');
const trainingSectionEnd = html2.indexOf('</section>', trainingSectionStart);

if (trainingSectionStart !== -1) {
    let trainingSection = html2.substring(trainingSectionStart, trainingSectionEnd);
    
    // Replace all fas fa-check-circle with an inline color style
    trainingSection = trainingSection.replace(/<i class="fas fa-check-circle"><\/i>/g, '<i class="fas fa-check-circle" style="color: var(--accent-primary);"></i>');
    
    html2 = html2.substring(0, trainingSectionStart) + trainingSection + html2.substring(trainingSectionEnd);
}

fs.writeFileSync('home-2.html', html2);
console.log('Fixed home-2.html');
