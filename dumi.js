const fs = require('node:fs');
const packages = require('./dumidoc');

const packagesJson = fs.readFileSync('./package.json', 'utf8');
const packagesParse = JSON.parse(packagesJson);

let isCopyFinish = false;

for (let i = 0; (len = packages.length), i < len; i++) {
  const component = packages[i];
  const { package, version, path, name } = component;
  if (packagesParse && packagesParse.devDependencies) {
    Reflect.set(packagesParse.devDependencies, package, `^${version}`);
  }
  const isExist = fs.existsSync(`${path}/src/index.md`);
  if (!isExist) continue;
  try {
    fs.copyFileSync(`${path}/src/index.md`, `./src/${name}.md`);
    console.log(`success  ${path}/src/index.md --> ./src/${name}.md`);
    isCopyFinish = true;
  } catch (error) {
    isCopyFinish = false;
    console.error(error);
  }
}

if (isCopyFinish) {
  fs.writeFile(
    './package.json',
    JSON.stringify(packagesParse, null, '\t'),
    (error, data) => {
      if (!error) {
        console.log('success  package.json write successed');
      }
    },
  );
} else {
  console.error('copy error.....');
}
