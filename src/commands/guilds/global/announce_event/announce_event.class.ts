import {BaseCommand} from '$core/handlers/commands/base_command.class';
import type {ChatInputCommandInteraction} from 'discord.js';
import {ChannelType} from 'discord.js';
import {commandsConfig} from '$core/config/message/command/commands.config';
import {isProd} from '$core/config/env';
import {devConfig} from '$core/config/guilds/_dev/dev.config';
import type {Result} from 'rustic-error';
import {error, ok, resultify} from 'rustic-error';
import {CommandError} from '$core/utils/error';
import {errorEmbed} from '$core/utils/discord/embet';
import {logger} from '$core/utils/logger/logger.func';
import {builder} from './announce_event.builder';
import {getActionsRow, getMessageReference} from './announce_event.util';
import type {GuildAlias} from '$core/handlers/commands';
import {guildsConfig} from '$core/config/guilds';
import {globalConfig} from '$core/config/global';
import {Dev} from '$core/utils/dev/dev.func';

const config = commandsConfig.annonceevent;

@Dev
export default class AnnounceEvent extends BaseCommand {
	guild: GuildAlias = 'global';
	builder = builder.toJSON();

	async run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>> {
		if (!interaction.inGuild() || interaction.guild === null || interaction.channel === null) return ok(false);

		const link = interaction.options.getString(config.options.link.name);
		if (!link) return error(new CommandError('No value in option link', interaction));

		const messageReference = getMessageReference(link);

		if (messageReference === null) {
			const result = await resultify(() => interaction.reply({
				embeds: [errorEmbed(config.exec.invalidArgument)],
				ephemeral: true
			}));

			if (result.ok) return ok(false);
			else return error(new CommandError('failed to reply to interaction, DJS error : ' + result.error.message, interaction));
		}

		const channelId = typeof messageReference.channelId !== 'undefined' ? messageReference.channelId : interaction.channelId;

		const channelResult = await resultify(() => interaction.guild!.channels.fetch(channelId));
		if (!channelResult.ok) return error(new CommandError('Failed to fetch channel, DJS error : ' + channelResult.error.message, interaction));

		const channel = channelResult.value;

		if (channel === null || (channel.type !== ChannelType.GuildAnnouncement && channel.type !== ChannelType.GuildText)) {

			const result = await resultify(() => interaction.reply({
				embeds: [errorEmbed(config.exec.invalidChannel)],
				ephemeral: true
			}));

			if (result.ok) return ok(false);
			else return error(new CommandError('failed to reply to interaction, DJS error : ' + result.error.message, interaction));

		}
		const message = await channel.messages.fetch(messageReference.messageId).catch(e => {
			logger.warning(`AnnounceEvent : Impossible to fetch message with id ${messageReference.messageId}, error : ${e instanceof Error ? e.message : e}`);
			return undefined;
		});

		if (typeof message === 'undefined'|| message.content.length < 1) {

			const result = await resultify(() => interaction.reply({
				embeds: [errorEmbed(config.exec.invalidMessage)],
				ephemeral: true
			}));
			if (result.ok) return ok(false);
			else return error(new CommandError('failed to reply to interaction, DJS error : ' + result.error.message, interaction));

		}
		const guildConfig = isProd ? guildsConfig.global : devConfig.guilds.guildSection;

		await interaction.reply({
			content: message.content.replace(globalConfig.eventAnnouncementPingReplacer, `<@&${guildConfig.eventAnnouncements.roleId}>`),
			components: getActionsRow(),
			allowedMentions: {
				parse: []
			},
			files: message.attachments.toJSON()
		});

		return ok(true);
	}
}
