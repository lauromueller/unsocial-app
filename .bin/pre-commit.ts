const fs = require('fs');
const resolve = require('path').resolve;
const join = require('path').join;
const cp = require('child_process');

const rootDir = join(__dirname, '..');

fs.readdirSync(rootDir).forEach((dirName) => {
  const dirPath = join(rootDir, dirName);

  if (!fs.existsSync(join(dirPath, 'package.json'))) {
    return;
  }

  console.log(`### Executing pre-commit commands in: ${dirName}`);
  cp.execSync('npm run lint:staged', {
    env: process.env,
    cwd: dirPath,
    stdio: "inherit"
  });
  cp.execSync('npm run tsc:check', {
    env: process.env,
    cwd: dirPath,
    stdio: "inherit"
  });
});