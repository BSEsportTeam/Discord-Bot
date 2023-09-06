import {logger} from '$core/utils/logger';
import {anyToError} from '$core/utils/error';
import {existsSync, readdirSync, statSync} from 'fs';
import {TASK_PATH} from '$core/handlers/task/task.const';
import {mainDir} from '$core/index';
import {sep} from 'path';
import {Task} from '$core/handlers/task/task.class';
import {isDev} from '$core/config/env';
import {TaskType} from '$core/handlers/task/task.type';
import {startCronJob} from '$core/utils/cron';

export const loadTask = async () => {
	try {
		let loadedTask = 0;
		const dirs = readdirSync(TASK_PATH(mainDir()));

		for (const dir of dirs) {
			const path = `${TASK_PATH(mainDir())}${sep}${dir}${sep}`;

			if (!statSync(path).isDirectory()) {
				continue;
			}

			const filePath = path + `${dir}.class.` + (isDev ? 'ts' : 'js');

			if (!existsSync(filePath)) {
				logger.fatal(`class file ${filePath} event not found for dir ${dir}`);
			}

			const taskImport = await import(filePath);
			const taskConstructor = taskImport.default;

			if (typeof taskConstructor !== 'function') {
				logger.fatal(`export default of ${filePath} task is not a constructor !`);
			}

			const taskClass = new taskConstructor;

			if (typeof taskClass !== 'object' || !(taskClass instanceof Task)) {
				logger.fatal(`class in ${filePath} is not a Task class !`);
			}

			if (!taskClass.isEnableInDev && isDev) {
				continue;
			}

			switch (taskClass.type) {

			case TaskType.CRON_INTERVAL:
				if (typeof taskClass.interval !== 'string') {
					logger.fatal(`don't get string for interval for task of type CronInterval in file ${filePath}`);
				}

				startCronJob(taskClass.interval, () => {
					taskClass.onTick();
				});
				loadedTask++;
				break;

			case TaskType.DELAY_INTERVAL:
				if (typeof taskClass.interval !== 'number') {
					logger.fatal(`don't get number for interval for task of type DelayInterval in file ${filePath}`);
				}

				setInterval(() => {
					taskClass.onTick();
				}, taskClass.interval);
				loadedTask++;
				break;

			case TaskType.MULTIPLE_CRON_INTERVAL:
				if (!Array.isArray(taskClass.interval)) {
					logger.fatal(`don't get array for interval for task of type MultipleCronInterval in file ${filePath}`);
				}

				for (const interval of taskClass.interval) {
					startCronJob(interval.interval, () => {
						if (typeof interval.options !== 'undefined') taskClass.onTick(interval.options);
						else taskClass.onTick();
					});
				}
				loadedTask++;
				break;

			default:
				logger.fatal(`unknown type of task interval in file ${filePath}`);
				break;
			}

		}

		logger.info(`loaded ${loadedTask} tasks !`);
	} catch (e) {
		logger.fatal(`failed to load task, error : ${anyToError(e).message}`);
	}
};