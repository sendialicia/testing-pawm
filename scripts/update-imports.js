const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function findFiles(startPath, filter) {
  let results = [];
  if (!fs.existsSync(startPath)) return results;

  const files = fs.readdirSync(startPath);
  for (let file of files) {
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      results = results.concat(findFiles(filename, filter));
    } else if (filename.match(filter)) {
      results.push(filename);
    }
  }
  return results;
}

function updateImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const updated = content.replace(
    /import\s*{\s*(?:PrismaClient|[^}]+)\s*}\s*from\s*['"]@\/app\/generated\/prisma\/client['"];?/g,
    'import { PrismaClient } from "@prisma/client";'
  );
  fs.writeFileSync(filePath, updated);
}

const files = findFiles('./app', /\.(ts|tsx)$/);
files.forEach(file => {
  try {
    updateImports(file);
    console.log(`Updated imports in ${file}`);
  } catch (err) {
    console.error(`Error updating ${file}:`, err);
  }
});