import {BaseCommand} from '$core/commands/base_command.class';
import type {ChatInputCommandInteraction} from 'discord.js';
import {ChannelType} from 'discord.js';
import {commandsConfig} from '$core/config/commands/commands.config';
import {isProd} from '$core/utils/environements';
import {devConfig} from '$core/config/dev.config';
import type {Result} from 'rustic-error';
import {error, ok, resultify} from 'rustic-error';
import {CommandError} from '$core/utils/error';
import {errorEmbed} from '$core/utils/embet';
import {logger} from '$core/utils/logger/logger.func';
import type {Client} from '$core/client';
import {builder} from './announce_event.builder';
import {getActionsRow, getMessageReference} from './announce_event.util';
import type {CommandCreateFunc, Guilds} from '$core/commands/command.type';

const config = commandsConfig.annonceevent;


export class AnnounceEvent extends BaseCommand {
	guild: Guilds = 'global';
	builder = builder.toJSON();

	async run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>> {
		if (!interaction.inGuild() || interaction.guild === null || interaction.channel === null) return ok(false);

		const link = interaction.options.getString(config.options.link.name);
		if (!link) return error(new CommandError('No value in option link', interaction));

		const messageReference = getMessageReference(link);

		if (messageReference === null) {
			const result = await resultify(() => interaction.reply({
				embeds: [errorEmbed(config.messages.invalidArgument)],
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
				embeds: [errorEmbed(config.messages.invalidChannel)],
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
				embeds: [errorEmbed(config.messages.invalidMessage)],
				ephemeral: true
			}));
			if (result.ok) return ok(false);
			else return error(new CommandError('failed to reply to interaction, DJS error : ' + result.error.message, interaction));

		}
		const guildConfig = isProd ? this.client.config.servers.global : devConfig.servers.serverSection;

		await interaction.reply({
			content: message.content.replace(this.client.config.global.eventAnnouncementPingReplacer, `<@&${guildConfig.eventAnnouncements.roleId}>`),
			components: getActionsRow(),
			allowedMentions: {
				parse: []
			},
			files: message.attachments.toJSON()
		});

		return ok(true);
	}
}
export const command: CommandCreateFunc = (client: Client): AnnounceEvent => {
	return new AnnounceEvent(client);
};