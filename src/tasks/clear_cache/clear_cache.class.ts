import {Task, TaskType} from '$core/handlers/task';
import {clearCooldown} from '$core/events/message_create/message_create.util';
import {logger} from '$core/utils/logger';

export default class ClearCache extends Task<null> {
	isEnableInDev = true;
	type: TaskType = TaskType.DELAY_INTERVAL;
	interval = 6 * 60 * 60 * 1000;

	onTick() {
		clearCooldown();
		logger.info('cleared cache !');
	}

}