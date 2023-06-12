import {Task, TaskType} from '$core/handlers/task';

export default class BrawlStarsLdc extends Task {
	interval = '0 13,16,17 * * *'; //all days on 13h, 16h and 17h
	type = TaskType.CRON_INTERVAL;

	async onTick(): Promise<void> {
		return undefined;
	}
}