const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, 'src');

// Crear nuevas carpetas
const dirs = [
  'components/ui',
  'components/common',
  'components/dashboard',
  'views/dashboard',
  'assets/styles',
  'services'
];

dirs.forEach(dir => {
  const fullPath = path.join(projectRoot, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Movimientos de archivos
const moves = [
  // Layouts
  { from: 'layouts/MainLayout.vue', to: 'layouts/DashboardLayout.vue' },
  // Views
  { from: 'views/principal/CrearPage.vue', to: 'views/dashboard/CrearPage.vue' },
  { from: 'views/principal/PerfilPage.vue', to: 'views/dashboard/PerfilPage.vue' },
  { from: 'views/principal/PrincipalPage.vue', to: 'views/dashboard/PrincipalPage.vue' },
  { from: 'views/principal/PruebaPage.vue', to: 'views/dashboard/PruebaPage.vue' },
  // Components
  { from: 'components/SelectorSeries.vue', to: 'components/ui/SelectorSeries.vue' },
  { from: 'components/Card.vue', to: 'components/ui/Card.vue' },
  { from: 'components/CardPrueba.vue', to: 'components/ui/CardPrueba.vue' },
  { from: 'components/Header.vue', to: 'components/common/Header.vue' },
  { from: 'components/Publicacion.vue', to: 'components/dashboard/Publicacion.vue' },
  { from: 'components/Comentario.vue', to: 'components/dashboard/Comentario.vue' },
  { from: 'components/Ranking.vue', to: 'components/dashboard/Ranking.vue' },
  { from: 'components/Personas.vue', to: 'components/dashboard/Personas.vue' },
  // Styles
  { from: 'style.css', to: 'assets/styles/style.css' }
];

moves.forEach(move => {
  const fromPath = path.join(projectRoot, move.from);
  const toPath = path.join(projectRoot, move.to);
  if (fs.existsSync(fromPath)) {
    fs.renameSync(fromPath, toPath);
    console.log(`Moved ${move.from} to ${move.to}`);
  }
});

// Remove old directory if empty
try {
  fs.rmdirSync(path.join(projectRoot, 'views/principal'));
} catch(e) {}

// API split will be done manually by creating the files.
// Let's fix imports across all .vue and .js files
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

const importReplacements = [
  // Layouts
  { regex: /layouts\/MainLayout\.vue/g, repl: 'layouts/DashboardLayout.vue' },
  { regex: /\.\.\/layouts\/MainLayout\.vue/g, repl: '../layouts/DashboardLayout.vue' },
  { regex: /\.\/layouts\/MainLayout\.vue/g, repl: './layouts/DashboardLayout.vue' },
  { regex: /\@\/layouts\/MainLayout\.vue/g, repl: '@/layouts/DashboardLayout.vue' },
  
  // Views
  { regex: /views\/principal\//g, repl: 'views/dashboard/' },
  
  // Components UI
  { regex: /components\/SelectorSeries\.vue/g, repl: 'components/ui/SelectorSeries.vue' },
  { regex: /components\/Card\.vue/g, repl: 'components/ui/Card.vue' },
  { regex: /components\/CardPrueba\.vue/g, repl: 'components/ui/CardPrueba.vue' },
  
  // Components Common
  { regex: /components\/Header\.vue/g, repl: 'components/common/Header.vue' },
  
  // Components Dashboard
  { regex: /components\/Publicacion\.vue/g, repl: 'components/dashboard/Publicacion.vue' },
  { regex: /components\/Comentario\.vue/g, repl: 'components/dashboard/Comentario.vue' },
  { regex: /components\/Ranking\.vue/g, repl: 'components/dashboard/Ranking.vue' },
  { regex: /components\/Personas\.vue/g, repl: 'components/dashboard/Personas.vue' },

  // API mappings to new services (we will split api.js into 4 files)
  // For simplicity we will change imports from api.js to authService, postService, userService, interactionService based on method names.
  // We'll run a specific pass for API imports.
];

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  importReplacements.forEach(rep => {
    content = content.replace(rep.regex, rep.repl);
  });

  // Relative path adjustments due to folder depth change
  // If we are in `views/dashboard/` the depth from `views/principal/` is the same (depth 2) -> `../../`
  // If we are in `components/dashboard/` the depth is 2 vs old depth 1 (`components/`). We need to fix imports inside components.
  if (file.includes('/components/ui/') || file.includes('/components/common/') || file.includes('/components/dashboard/')) {
    // We moved components one level deeper, so `../` becomes `../../` for services and stores.
    // E.g. `import { x } from '../services/api'` -> `../../services/api`
    content = content.replace(/from '\.\.\/services/g, "from '../../services");
    content = content.replace(/from '\.\.\/stores/g, "from '../../stores");
    content = content.replace(/from '\.\.\/assets/g, "from '../../assets");
  }

  // Update style.css in main.js
  if (file.endsWith('main.js')) {
    content = content.replace("import './style.css'", "import './assets/styles/style.css'");
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated imports in ${file}`);
  }
});
