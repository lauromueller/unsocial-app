const cp = require('child_process');
const { runCommand } = require('./setup');

runCommand(({ dirName, dirPath }) => {
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
})