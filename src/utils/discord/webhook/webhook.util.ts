import type {EmbedBuilder} from 'discord.js';
import {WebhookClient} from 'discord.js';
import {env} from '$core/config/env';
import {client} from '$core/index';
import {logger} from '$core/utils/logger';
import {anyToError} from '$core/utils/error';

const webhookClient = new WebhookClient({url: env.WEBHOOK_DISCORD_URL}, {allowedMentions: {parse: []}});

export const sendBotLog = async (embed: EmbedBuilder) => {
	try {
		await webhookClient.send({
			username: client.user?.username,
			avatarURL: client.user?.avatarURL() || undefined,
			embeds: [embed]
		});
	} catch (e) {
		logger.error(`failed to send bot log, error : ${anyToError(e).message}`);
		logger.debug({
			embed: JSON.stringify(embed.toJSON())
		});
	}
};