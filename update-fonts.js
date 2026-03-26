const fs = require('fs');
const path = require('path');

// Find all .tsx files recursively
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!filePath.includes('node_modules')) {
        findFiles(filePath, fileList);
      }
    } else if (file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Replace fonts in content
function replaceFonts(content) {
  return content
    .replace(/fontFamily: 'Queens, serif'/g, "fontFamily: 'Roboto, sans-serif'")
    .replace(/fontFamily: 'Open Sans, sans-serif'/g, "fontFamily: 'Roboto, sans-serif'");
}

// Process all files
const files = findFiles('./src');
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const newContent = replaceFonts(content);
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated: ${file}`);
  }
});

console.log('Font replacement complete!');
