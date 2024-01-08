const { execSync } = require('child_process');
const licenseChecker = require('license-checker-rseidelsohn');

const ALLOWED_LICENSES = [
  'MIT',
  'ISC',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'Apache-2.0',
];

const WORKSPACES = JSON.parse(execSync('pnpm list -r --json').toString()).map(
  ({ path, name, version }) => ({
    name,
    path,
    version,
  }),
);

const IGNORED_PACKAGES = [
  ...WORKSPACES.map(({ name, version }) => `${name}@${version}`),
  'turbo@1.11.2',
];

WORKSPACES.forEach(({ name, path }) => {
  licenseChecker.init(
    {
      start: path,
      excludePackages: IGNORED_PACKAGES.join(';'),
      onlyAllow: ALLOWED_LICENSES.join(';'),
    },
    () => {
      console.info(`Check passed for ${name}:\n`);
    },
  );
});
