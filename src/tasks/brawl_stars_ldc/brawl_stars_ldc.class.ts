import {Task, TaskType} from '$core/handlers/task';
import {Dev} from '$core/utils/dev';
import {BrawlStarsAnnouncementType} from '$core/tasks/brawl_stars_ldc/brawl_stars_ldc.type';
import {getCurrentAnnouncementType} from '$core/tasks/brawl_stars_ldc/brawl_stars_ldc.util';
import {tasksConfig} from '$core/config/message/task/task.config';
import {guildsConfig} from '$core/config/guilds';
import {isDev} from '$core/config/env';
import {devConfig} from '$core/config/guilds/_dev/dev.config';
import {logger} from '$core/utils/logger';
import {resultify} from 'rustic-error';
import {getMessageChannel} from '$core/utils/discord/channel/channel.func';
import {simpleEmbed} from '$core/utils/discord/embet/embet.func';

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

		const guildConfig = isDev ? devConfig.guilds.guildSection : guildsConfig.brawlStars;

		const channelResult = await getMessageChannel(guildConfig.guildId, guildConfig.autoPing.channel, 'brawl stars ldc ping');

		if (!channelResult.ok) {
			logger.error(channelResult.error.message);
			return;
		}

		const channel = channelResult.value;

		const options = type === BrawlStarsAnnouncementType.START_LDC ? tasksConfig.brawlStarsLdc.startLdc :
			type === BrawlStarsAnnouncementType.END_LDC ? tasksConfig.brawlStarsLdc.endLdc :
				tasksConfig.brawlStarsLdc.jdc;


		const embed = simpleEmbed(options.description).setImage(options.imageUrl);

		const roles = Object.values(guildConfig.autoPing.roles);

		const result = await resultify(() => channel.send({
			content: '<@&' + roles.join('> <@&') + '>',
			embeds: [embed]
		}));

		if (!result.ok) {
			logger.error(`failed to send message for brawl stars ldc, error : ${result.error.message}`);
		}
	}
}