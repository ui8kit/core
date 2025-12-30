// Simple script to generate core-classes.json
const fs = require('fs');
const path = require('path');

// Read all class files
const files = [
  'core.ts',
  'spacing.ts',
  'color.ts',
  'transforms.ts',
  'sr.ts'
];

let allClasses = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, 'classes', file), 'utf8');

  // Extract class names using regex
  const matches = content.match(/'([^']+)':/g);
  if (matches) {
    matches.forEach(match => {
      const className = match.replace(/'/g, '').replace(':', '');
      allClasses.push(className);
    });
  }
});

// Also check squareBracket.ts for arbitrary values
const squareBracketContent = fs.readFileSync(path.join(__dirname, 'classes', 'squareBracket.ts'), 'utf8');
const squareMatches = squareBracketContent.match(/'([^']+)':/g);
if (squareMatches) {
  squareMatches.forEach(match => {
    const className = match.replace(/'/g, '').replace(':', '');
    allClasses.push(className);
  });
}

// Remove duplicates and sort
allClasses = [...new Set(allClasses)].sort();

// Generate result
const result = {
  classes: allClasses,
  count: allClasses.length,
  timestamp: new Date().toISOString()
};

// Write to file
fs.writeFileSync(path.join(__dirname, 'core-classes.json'), JSON.stringify(result, null, 2));

console.log(`Generated ${allClasses.length} classes`);
