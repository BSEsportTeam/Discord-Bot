import {sep} from 'path';

export const COMMANDS_PATHS = [
	(baseDir: string) => `${baseDir}${sep}commands${sep}globals`,
	(baseDir: string) => `${baseDir}${sep}commands${sep}guilds`,
];