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

  console.log(`### Executing npm ci in: ${dirName}`);
  cp.spawn('npm', ['--silent', 'ci'], {
    env: process.env,
    cwd: dirPath,
    stdio: "inherit"
  })
});