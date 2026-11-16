const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, '..', 'src', 'js');
const files = ['config.js', 'storage.js', 'sync.js', 'state.js', 'dragDrop.js', 'modal.js', 'ui.js', 'landing.js', 'app.js'];

let combined = '(function() {\n  "use strict";\n\n';

for (const file of files) {
  let content = fs.readFileSync(path.join(jsDir, file), 'utf8');
  // Strip import statements
  content = content.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '');
  // Strip export keywords
  content = content.replace(/^export\s+(const|let|var|class|function|default)\s+/gm, '$1 ');
  content = content.replace(/^export\s*\{[^}]*\};?\s*$/gm, '');

  combined += `  // ==================== ${file} ====================\n` + content + '\n\n';
}

combined += '})();\n';

fs.writeFileSync(path.join(jsDir, 'bundle.js'), combined, 'utf8');
console.log('Generated bundle.js successfully! Size:', combined.length, 'bytes');
