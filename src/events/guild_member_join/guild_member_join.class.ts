import {Event} from '$core/handlers/events';
import type {GuildMember} from 'discord.js';
import {Dev} from '$core/utils/dev';
import {getGuildXp} from '$core/handlers/database/xp';
import {logger} from '$core/utils/logger';
import {checkXpRoles} from '$core/utils/xp/xp.func';
import {calculateLevel} from '$core/utils/xp';

@Dev
export default class GuildMemberJoin extends Event<'guildMemberAdd'> {
	name = 'guildMemberAdd' as const;

	async run(member: GuildMember) {

		const xpInfos = await getGuildXp(member.user.id, member.guild.id);
		if (!xpInfos.ok) {
			logger.error(`failed to get xp infos about member, error : ${xpInfos.error}`);
			logger.debugValues(xpInfos.error.debug());
		}

		if (xpInfos.ok && xpInfos.value !== null) {
			void checkXpRoles(
				member.user.id,
				member.guild.id,
				0,
				calculateLevel(xpInfos.value),
				true
			);
		}

	}
}