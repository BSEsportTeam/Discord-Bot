import {Event} from '$core/handlers/events';
import {Dev} from '$core/utils/dev';
import type {Message} from 'discord.js';
import {getGuildWithId} from '$core/config/guilds';

@Dev
export default class MessageCreate extends Event<'messageCreate'> {
	name = 'messageCreate' as const;

	async run(message: Message): Promise<void>  {
		if (message.author.bot) {
			return;
		}

		if (message.guild === null || message.guildId === null || !message.inGuild()) {
			return;
		}

		//check xp
		const xpConfig = getGuildWithId(message.guildId);
		if (xpConfig !== null && xpConfig.xp.enable) {

		}
	}
}