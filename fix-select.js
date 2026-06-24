const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/Divya Prabha/Desktop/Chess_Club_Tournament_Platform';
const signupFile = path.join(dir, 'signup.html');
let signupContent = fs.readFileSync(signupFile, 'utf8');

const customSelectCss = '.auth-form select { -webkit-appearance: none; -moz-appearance: none; appearance: none; background-image: url(\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>\\'); background-repeat: no-repeat; background-position: calc(100% - 15px) center; background-size: 16px; padding-inline-end: 2.5rem !important; } html[dir="rtl"] .auth-form select { background-position: 15px center; }';

signupContent = signupContent.replace(/\.auth-form select \{\s*padding-inline-end: 2\.5rem !important;\s*\}/, customSelectCss);

fs.writeFileSync(signupFile, signupContent, 'utf8');
console.log('Fixed select arrow position');
