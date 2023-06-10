import {existsSync, readdirSync, statSync} from 'fs';
import {EVENTS_PATHS} from '$core/handlers/events/event.const';
import {client, mainDir} from '$core/index';
import {sep} from 'path';
import {logger} from '$core/utils/logger';
import {Event} from '$core/handlers/events/event.class';
import {isDev} from '$core/config/env';

export const eventLoad = async () => {
	try {

		let loadedEvents = 0;
		const dirs = readdirSync(EVENTS_PATHS(mainDir()));

		for (const dir of dirs) {
			const path = `${EVENTS_PATHS(mainDir())}${sep}${dir}${sep}`;

			if (!statSync(path).isDirectory()) {
				continue;
			}

			const filePath = path + `${dir}.class.ts`;

			if (!existsSync(filePath)) {
				logger.fatal(`class file ${filePath} not found for dir ${dir}`);
			}

			const eventImport = await import(filePath);
			const eventConstructor = eventImport.default;

			if (typeof eventConstructor !== 'function') {
				logger.fatal(`export default of ${filePath} event is not a constructor !`);
			}

			const eventClass = new eventConstructor();

			if (typeof eventClass !== 'object' || !(eventClass instanceof Event)) {
				logger.fatal(`class in ${filePath} is not a Event class !`);
			}

			if (!eventClass.isEnableInDev && isDev) {
				continue;
			}

			client.on(eventClass.name, (...args) => {
				eventClass.run(args);
			});

			loadedEvents+=1;

		}

		logger.info(`loaded ${loadedEvents} events !`);
	} catch (e) {
		logger.fatal('failed to load events, error : ' + (e instanceof Error ? e.message : `${e}`));
	}
};