import {updateGuildAvatar, updateGuildUsername} from '$core/handlers/database/member';
import {logger} from '$core/utils/logger';
import {Dev} from '$core/utils/dev';
import {Event} from '$core/handlers/events';
import type {GuildMember} from 'discord.js';


@Dev
export default class UserUpdate extends Event<'guildMemberUpdate'> {
	name = 'guildMemberUpdate' as const;

	async run(oldMember: GuildMember, newMember: GuildMember) {
		if (oldMember.nickname !== newMember.nickname) {
			const updateResult = await updateGuildUsername(newMember.user.id, newMember.guild.id, newMember.nickname || undefined);
			if (!updateResult.ok) {
				logger.error(updateResult.error.message, updateResult.error.debug());
			}
		}
		if (oldMember.avatar !== newMember.avatar) {
			const updateResult = await updateGuildAvatar(newMember.id, newMember.guild.id, newMember.avatar || undefined);
			if (!updateResult.ok) {
				logger.error(updateResult.error.message, updateResult.error.debug());
			}
		}
	}
}