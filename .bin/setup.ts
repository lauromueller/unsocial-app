const fs = require('fs');
const resolve = require('path').resolve;
const join = require('path').join;

export type CmdArgs = {
  dirName: string;
  dirPath: string;
}

const rootDir = resolve(__dirname, '..');

export const runCommand = (cmd: (args: CmdArgs) => void): void => {
  fs.readdirSync(rootDir).forEach((dirName) => {
    const dirPath = join(rootDir, dirName);

    if (!fs.existsSync(join(dirPath, 'package.json'))) {
      return;
    }

    cmd({ dirName, dirPath });
  });
}