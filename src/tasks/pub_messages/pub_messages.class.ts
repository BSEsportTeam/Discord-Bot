import {Task, TaskType} from '$core/handlers/task';
import {Dev} from '$core/utils/dev';
import {ActionRowBuilder, ButtonBuilder} from 'discord.js';
import type {PubMessageConfig} from '$core/config/guilds';
import {getDevGuildWithId, getGuildWithId} from '$core/config/guilds';
import {getMessageChannel} from '$core/utils/discord';
import type {Snowflake} from 'discord-api-types/globals';
import {logger} from '$core/utils/logger';
import {resultify} from 'rustic-error';
import {PubMessageHour} from '$core/tasks/pub_messages/pub_messages.type';
import {
	FIRST_MESSAGE_HOUR,
	FIRST_SEND_RANGE_IN_MIN,
	SECOND_MESSAGE_HOUR,
	SECOND_SEND_RANGE_IN_MIN
} from '$core/tasks/pub_messages/pub_messages.const';
import {getAllGuilds, resetMessagesSinceLastPub, setLastMessagePub} from '$core/handlers/database/guild/guild.func';
import {isDev} from '$core/config/env';
import {getMinMessages, getRandomMessage, isToday} from '$core/tasks/pub_messages/pub_messages.util';
import {generateRandomValue} from '$core/utils/function/random/random.func';


@Dev
export default class PubMessage extends Task<PubMessageHour> {
	type = TaskType.MULTIPLE_CRON_INTERVAL;
	interval = [
		{
			interval: `0 ${FIRST_MESSAGE_HOUR} * * *`,
			options: PubMessageHour.First
		},
		{
			interval: `0 ${SECOND_MESSAGE_HOUR} * * *`,
			options: PubMessageHour.Second
		}
	];

	async onTick(messageHour: PubMessageHour) {
		const guildsInfosResult = await getAllGuilds();
		if (!guildsInfosResult.ok) {
			logger.error(`failed to get all guild for send pub message, error : ${guildsInfosResult.error.message}`);
			logger.debugValues(guildsInfosResult.error.debug());
			return;
		}

		for (const guild of guildsInfosResult.value) {
			const guildConfig = (isDev ? getDevGuildWithId(guild.id) : getGuildWithId(guild.id))?.pubMessages;
			if (!guildConfig || !guildConfig.enable || guildConfig.messages.length < 1) {
				continue;
			}

			if (guild.lastPubMessage === null) {
				setTimeout(() => {
					this.sendMessage(guild.id, guildConfig.channelId, getRandomMessage(guildConfig.messages));
				}, 1000 * 60 * generateRandomValue(messageHour === PubMessageHour.First ? FIRST_SEND_RANGE_IN_MIN : SECOND_SEND_RANGE_IN_MIN));
				continue;
			}

			if (messageHour === PubMessageHour.Second && !isToday(guild.lastPubMessage)) {
				if (getMinMessages(guild.lastPubMessage) <= guild.messagesSinceLastPub) {
					setInterval(() => {
						this.sendMessage(guild.id, guildConfig.channelId, getRandomMessage(guildConfig.messages));
					}, 1000 * 60 * generateRandomValue(SECOND_SEND_RANGE_IN_MIN));
					continue;
				}
			}

			if (messageHour === PubMessageHour.First && getMinMessages(guild.lastPubMessage) <= guild.messagesSinceLastPub) {
				setInterval(() => {
					this.sendMessage(guild.id, guildConfig.channelId, getRandomMessage(guildConfig.messages));
				}, 1000 * 60 * generateRandomValue(FIRST_SEND_RANGE_IN_MIN));
			}
		}
	}

	async sendMessage(guildId: Snowflake, channelId: Snowflake, message: PubMessageConfig) {
		const actionRow = new ActionRowBuilder<ButtonBuilder>();
		if (typeof message.buttonsLinks !== 'undefined') {
			for (const key in message.buttonsLinks) {
				actionRow.addComponents(new ButtonBuilder()
					.setLabel(key)
					.setURL(message.buttonsLinks[key]));
			}
		}

		const channel = await getMessageChannel(guildId, channelId);

		if (!channel.ok) {
			logger.error(`invalid pub message channel for guild ${guildId}, error : `, channel.error.message);
			return;
		}

		const result = await resultify(() => channel.value.send({
			embeds: [message.embed],
			components: actionRow.components.length > 0 ? [actionRow] : undefined
		}));
		if (!result.ok) {
			logger.error(`failed to send pub message in channel ${channelId} (guild ${guildId}, error : ${result.error}`);
			return;
		}

		const resetResult = await resetMessagesSinceLastPub(guildId);
		if (!resetResult.ok) {
			logger.error(`failed to reset messages count for pub message, error : ${resetResult.error.message}`);
			logger.debugValues(resetResult.error.debug());
		}

		const setDateResult = await setLastMessagePub(guildId, result.value.createdAt);
		if (!setDateResult.ok) {
			logger.error(`failed to set last pub message date, error : ${setDateResult.error.message}`);
			logger.debugValues(setDateResult.error.debug());
		}
	}
}