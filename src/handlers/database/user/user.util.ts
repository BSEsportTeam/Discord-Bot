import type {User} from '@prisma/client';
import type {User as DiscordUser} from 'discord.js';

export const getUserDataFromDiscordUser = (user: DiscordUser): User => {
	return {
		id: user.id,
		username: user.tag,
		avatar: user.avatar,
		displayName: user.username
	};
};