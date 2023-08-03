import type {GuildMember} from '@prisma/client';
import type {GuildMember as DiscordGuildMember} from 'discord.js';

export const getMemberDataFromDiscordMember = (member: DiscordGuildMember): GuildMember => {
	return {
		userId: member.user.id,
		guildId: member.guild.id,
		xp: 0,
		avatar: member.avatar,
		displayName: member.displayName
	};
};