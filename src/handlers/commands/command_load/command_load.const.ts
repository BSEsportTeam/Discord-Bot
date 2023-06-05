import {sep} from 'path';

export const COMMAND_PATHS = [
	(baseDir: string) => `${baseDir}${sep}commands${sep}globals`,
	(baseDir: string) => `${baseDir}${sep}commands${sep}servers`
];