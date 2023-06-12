import {logger} from '$core/utils/logger';
import {readdirSync, statSync} from 'fs';
import {BUTTONS_PATH} from '$core/handlers/buttons/button.const';
import {sep} from 'path';
import {fileExistsSync} from 'tsconfig-paths/lib/filesystem';
import {client} from '$core/index';
import {ButtonHandlerSchema} from '$core/handlers/buttons/button.z';
import type {ButtonHandler} from '$core/handlers/buttons/button.type';

export const loadButtons = async () => {
	try {

		let loadedButtons = 0;
		for (const dir of readdirSync(BUTTONS_PATH)) {

			const dirPath = BUTTONS_PATH + sep + dir;

			if (!statSync(dirPath).isDirectory()) {
				continue;
			}

			const filePath = dirPath + sep + dir + '.button.ts';
			if (!fileExistsSync(filePath)) {
				logger.fatal(`file ${filePath} not found in dir ${dirPath}`);
			}

			const buttonImport = await import(filePath);
			const buttonHandlerList = buttonImport.default;

			if (typeof buttonHandlerList !== 'object') {
				logger.fatal(`invalid type of export default for file ${filePath}`);
			}

			if (Array.isArray(buttonHandlerList)) {

				for (const buttonHandler of buttonHandlerList) {
					const result = ButtonHandlerSchema.safeParse(buttonHandler);

					if (result.success) {

						const handler = result.data as ButtonHandler;
						client.buttons.set(handler.id, handler);
						loadedButtons++;

						continue;
					}
					logger.fatal(`invalid object schema for ${filePath}, zod error : ${result.error.message}`);

				}
				continue;
			}
			const result = ButtonHandlerSchema.safeParse(buttonHandlerList);

			if (result.success) {

				const handler = result.data as ButtonHandler;
				client.buttons.set(handler.id, handler);
				loadedButtons++;

				continue;
			}
			logger.fatal(`invalid object schema for ${filePath}, zod error : ${result.error.message}`);
		}

		logger.info(`loaded ${loadedButtons} buttons handler !`);

	} catch (e) {
		logger.fatal(`failed to load buttons, error ${e instanceof Error ? e.message : String(e)} `);
	}
};