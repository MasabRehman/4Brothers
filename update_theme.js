const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'client/src/admin/Products.jsx',
  'client/src/admin/Categories.jsx',
  'client/src/admin/Orders.jsx',
  'client/src/admin/Settings.jsx',
];

const replacements = [
  // Backgrounds & Borders
  { from: /bg-industrial-dark/g, to: 'industrial-card' },
  { from: /bg-industrial-black/g, to: 'bg-surface' },
  { from: /border-border-gray/g, to: 'border-outline-variant/30' },
  { from: /bg-black/g, to: 'bg-surface-container-lowest' },
  { from: /bg-\[\#111\]/g, to: 'bg-surface-container-low' },
  { from: /bg-\[\#1a1600\]/g, to: 'bg-secondary-container' },
  { from: /bg-\[\#11141c\]/g, to: 'bg-surface-container' },
  { from: /bg-\[\#0a0800\]/g, to: 'bg-surface-container-highest' },
  { from: /border-\[\#332c00\]/g, to: 'border-secondary-container' },
  { from: /hover:bg-industrial-dark/g, to: 'hover:bg-surface-container' },
  { from: /bg-black\/80/g, to: 'bg-surface\/80' },
  
  // Text Colors
  { from: /text-white/g, to: 'text-on-surface' },
  { from: /text-gray-300/g, to: 'text-on-surface' },
  { from: /text-gray-400/g, to: 'text-on-surface-variant' },
  { from: /text-gray-500/g, to: 'text-outline' },
  { from: /text-safety-yellow/g, to: 'text-secondary' },
  
  // Accents & Highlights
  { from: /bg-safety-yellow/g, to: 'bg-primary-container' },
  { from: /hover:bg-yellow-400/g, to: 'hover:brightness-110' },
  { from: /accent-safety-yellow/g, to: 'accent-secondary' },
  { from: /focus:border-safety-yellow/g, to: 'focus:border-secondary' },
  { from: /text-black/g, to: 'text-on-primary' },

  // Typography
  { from: /font-heading/g, to: 'font-headline-md' },

  // Buttons (replace custom classes)
  { from: /btn-primary/g, to: 'bg-primary-container text-on-primary font-label-bold uppercase tracking-widest hover:brightness-110 industrial-shadow rounded' },
  { from: /btn-secondary/g, to: 'bg-transparent border-2 border-secondary text-secondary font-label-bold uppercase tracking-widest hover:bg-surface-variant/10 rounded' },
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    replacements.forEach(({from, to}) => {
      content = content.replace(from, to);
    });
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
