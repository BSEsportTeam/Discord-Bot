import type {ButtonInteraction} from 'discord.js';
import {ChannelType} from 'discord.js';
import {authorOnly, disableButtons} from '$core/handlers/buttons/utils';
import {isProd} from '$core/utils/environements';
import {config} from '$core/config';
import {devConfig} from '$core/config/dev.config';

export const announcementEventConfirm = async (interaction: ButtonInteraction) => {
	try {
		const isAuthor = await authorOnly(interaction);
		if (!isAuthor) return;
		await interaction.deferReply({
			ephemeral: true
		});
		await disableButtons(interaction);
		for (const server of Object.values(isProd ? config.servers : devConfig.servers)) {
			if (!server.eventAnnouncements.enable) continue;
			const guild = await interaction.client.guilds.fetch(server.serverId);
			const channel = await guild.channels.fetch(server.eventAnnouncements.channelId);
			if (channel === null || !channel.isTextBased || channel.type === ChannelType.GuildCategory || channel.type === ChannelType.GuildForum) throw new Error('Invalid channel in config');
			const message = await channel.send({
				content: interaction.message.content.replaceAll(isProd ?
					config.servers.global.eventAnnouncements.roleId :
					devConfig.servers.serverSection.eventAnnouncements.roleId, server.eventAnnouncements.roleId),
				files: interaction.message.attachments.toJSON()
			});
			for (const emoji of config.global.eventAnnouncementEmojis) {
				await message.react(emoji);
			}

		}
		await interaction.editReply({
			content: 'succès'
		});
	} catch (e) {
		throw e;
	}
};

export const announcementEventCancel = async (interaction: ButtonInteraction) => {
	const isAuthor = await authorOnly(interaction);
	if (!isAuthor) return;
	await interaction.message.edit({
		content: 'ANNULÉ \n\n' + interaction.message.content
	});
	await disableButtons(interaction);
	await interaction.reply({
		content: 'annulé',
		ephemeral: true
	});

};