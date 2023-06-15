import {Task, TaskType} from '$core/handlers/task';
import {Dev} from '$core/utils/dev';
import {BrawlStarsAnnouncementType} from '$core/tasks/brawl_stars_ldc/brawl_stars_ldc.type';
import {getCurrentAnnouncementType} from '$core/tasks/brawl_stars_ldc/brawl_stars_ldc.util';

@Dev
export default class BrawlStarsLdc extends Task<BrawlStarsAnnouncementType> {
	interval = [
		{
			interval: '0 16 * * 3',
			options: BrawlStarsAnnouncementType.START_LDC
		},
		{
			interval: '0 13 * * 4',
			options: BrawlStarsAnnouncementType.END_LDC
		},
		{
			interval: '0 16 * * 5',
			options: BrawlStarsAnnouncementType.START_LDC,
		},
		{
			interval: '0 13 * * 6',
			options: BrawlStarsAnnouncementType.END_LDC,
		},
		{
			interval: '0 16 * * 0',
			options: BrawlStarsAnnouncementType.START_LDC,
		},
		{
			interval: '0 13 * * 1',
			options: BrawlStarsAnnouncementType.END_LDC,
		},
		{
			interval: '0 17 * * 2',
			options: BrawlStarsAnnouncementType.JDC,
		},
		{
			interval: '0 17 * * 6',
			options: BrawlStarsAnnouncementType.JDC,
		}
	];

	type = TaskType.MULTIPLE_CRON_INTERVAL;

	async onTick(baseTick: BrawlStarsAnnouncementType): Promise<void> {
		const type = getCurrentAnnouncementType();

		if (type === null || baseTick !== type) {
			return;
		}

		

	}
}