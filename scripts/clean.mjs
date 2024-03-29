import { rm } from 'fs/promises';

const rootDir = new URL('../', import.meta.url);
const packagesDir = new URL('packages/', rootDir);
const options = { recursive: true, force: true };

const paths = [
	// Dist folders
	new URL('core-sdk/dist/', packagesDir),

	// Turbo folders
	new URL('core-sdk/.turbo/', packagesDir)
];

await Promise.all(paths.map((path) => rm(path, options)));
