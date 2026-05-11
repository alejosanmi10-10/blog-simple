const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('./src', function(filePath) {
  if (filePath.endsWith('.js') || filePath.endsWith('.vue')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace functions to services
    content = content.replace(/['"]\.\.\/functions\/(.*)['"]/g, "'../services/$1'");
    content = content.replace(/['"]\.\.\/\.\.\/functions\/(.*)['"]/g, "'../../services/$1'");

    // For router/index.js
    if (filePath.includes('router/index.js') || filePath.includes('router\\index.js')) {
      content = content.replace(/['"]\.\/src\/pages\/(.*)['"]/g, "'../views/$1'");
      content = content.replace(/['"]\.\/src\/layouts\/(.*)['"]/g, "'../layouts/$1'");
    }

    // For main.js
    if (filePath.includes('main.js')) {
      content = content.replace(/['"]\.\.\/router['"]/g, "'./router'");
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  }
});
