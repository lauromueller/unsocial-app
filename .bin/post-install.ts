const cp = require('child_process');
const { runCommand } = require('./setup');

runCommand(({ dirName, dirPath }) => {

  console.log(`### Executing npm ci in: ${dirName}`);

  cp.spawn('npm', ['--silent', 'ci'], {
    env: process.env,
    cwd: dirPath,
    stdio: "inherit"
  });
});