import type { guilds} from '$core/commands/BaseCommand';
import {BaseCommand} from '$core/commands/BaseCommand';
import type {
	ChatInputCommandInteraction} from 'discord.js';
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ChannelType,
	PermissionFlagsBits,
	SlashCommandBuilder,
	SlashCommandStringOption
} from 'discord.js';
import {buttonsIds} from '$core/utils/ids';
import {commandsConfig} from '$core/config/commands/commands.config';
import {isProd} from '$core/utils/environements';
import {devConfig} from '$core/config/dev.config';
import type { Result} from 'rustic-error';
import {error, ok} from 'rustic-error';
import {CommandError} from '$core/utils/error/error.class';
import {errorEmbed} from '$core/utils/embet';
import {logger} from '$core/utils/logger';

const config = commandsConfig.annonceevent;

const builder = new SlashCommandBuilder()
	.setName(config.name)
	.setDescription(config.description)
	.setDMPermission(false)
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
	.addStringOption(new SlashCommandStringOption()
		.setName(config.options.link.name)
		.setRequired(true)
		.setDescription(config.options.link.description)
		.setMinLength(10));

export class AnnounceEvent extends BaseCommand {
	guild: guilds = 'global';
	builder = builder.toJSON();

	async run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>> {
		if (!interaction.inGuild()) return ok(false);
		let channelId: string;
		let messageId: string;
		const link = interaction.options.getString(config.options.link.name);
		if (!link) return error(new CommandError('No value in option link', interaction));
		if (link.includes('/') && new RegExp('https:\\/\\/[a-z]+\\.discord\\.com\\/channels.*[0-9]+\\/[0-9]+\\/[0-9]+').test(link)) {
			const split = link.split('/');
			channelId = split[5];
			messageId = split[6];
		} else if (!isNaN(parseInt(link))) {
			channelId = interaction.channel!.id;
			messageId = link;
		} else {
			await interaction.reply({
				embeds: [errorEmbed(config.messages.invalidArgument)],
				ephemeral: true
			});
			return ok(false);
		}

		const channel = await interaction.guild!.channels.fetch(channelId);
		if (channel === null || (channel.type !== ChannelType.GuildAnnouncement && channel.type !== ChannelType.GuildText)) {
			await interaction.reply({
				embeds: [errorEmbed(config.messages.invalidChannel)],
				ephemeral: true
			});
			return ok(false);
		}
		const message = await channel.messages.fetch(messageId).catch(e => {
			logger.warning(`AnnonceEvent : Impossible to fetch message with id ${messageId}, error : ${e instanceof Error ? e.message : e}`);
			return undefined;
		});
		if (typeof message === 'undefined'|| message.content.length < 1) {
			await interaction.reply({
				embeds: [errorEmbed(config.messages.invalidMessage)],
				ephemeral: true
			});
			return ok(false);
		}
		const guildConfig = isProd ? this.client.config.servers.global : devConfig.servers.serverSection;
		const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setLabel(config.other.buttons.valid)
				.setCustomId(buttonsIds.eventAnnouncements.confirm)
				.setStyle(ButtonStyle.Success),
			new ButtonBuilder()
				.setLabel(config.other.buttons.refuse)
				.setCustomId(buttonsIds.eventAnnouncements.cancel)
				.setStyle(ButtonStyle.Danger),
		);
		await interaction.reply({
			content: message.content.replace(this.client.config.global.eventAnnouncementPingReplacer, `<@&${guildConfig.eventAnnouncements.roleId}>`),
			components: [actionRow],
			allowedMentions: {
				parse: []
			},
			files: message.attachments.toJSON()
		});
		return ok(true);
	}
}