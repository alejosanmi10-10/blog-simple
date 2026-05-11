const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.vue') || file.endsWith('.js')) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });

  return arrayOfFiles;
}

const allFiles = getAllFiles(projectRoot);

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Encontrar todas las importaciones que provienen de `api`
  // Ej: import { login, registro } from '../../services/api'
  const importRegex = /import\s+{([^}]+)}\s+from\s+['"]([^'"]*services\/api(?:\.js)?)['"]/g;

  content = content.replace(importRegex, (match, importsStr, importPathBase) => {
    const imports = importsStr.split(',').map(s => s.trim());
    
    let authImports = [];
    let postImports = [];
    let userImports = [];
    let interactionImports = [];
    let coreImports = [];

    imports.forEach(imp => {
      if (['login', 'registro', 'logoutReq'].includes(imp)) authImports.push(imp);
      else if (['crearPost', 'deletePost', 'editPost'].includes(imp)) postImports.push(imp);
      else if (['actualizarAvatarReq'].includes(imp)) userImports.push(imp);
      else if (['TraerComentarios', 'crearComentario', 'deleteComentario', 'TraerRanking', 'reaccionar', 'TraerReacciones', 'TraerUsuariosReacciones', 'toggleFavorito', 'obtenerFavoritos'].includes(imp)) interactionImports.push(imp);
      else if (['Imprimir', 'formatearFecha'].includes(imp)) coreImports.push(imp);
    });

    const basePath = importPathBase.replace(/api(?:\.js)?$/, ''); // obtiene la ruta base, e.g. '../../services/' o '../services/'
    
    let newImports = [];
    if (authImports.length) newImports.push(`import { ${authImports.join(', ')} } from '${basePath}authService';`);
    if (postImports.length) newImports.push(`import { ${postImports.join(', ')} } from '${basePath}postService';`);
    if (userImports.length) newImports.push(`import { ${userImports.join(', ')} } from '${basePath}userService';`);
    if (interactionImports.length) newImports.push(`import { ${interactionImports.join(', ')} } from '${basePath}interactionService';`);
    if (coreImports.length) newImports.push(`import { ${coreImports.join(', ')} } from '${basePath}axiosSetup';`);

    return newImports.join('\n');
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated services imports in ${file}`);
  }
});
