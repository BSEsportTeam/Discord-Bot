import {Event} from '$core/handlers/events';
import type {User} from 'discord.js';
import {updateAvatar, updateDisplayName, updateUsername} from '$core/handlers/database/user';
import {logger} from '$core/utils/logger';
import {Dev} from '$core/utils/dev';

@Dev
export default class UserUpdate extends Event<'userUpdate'> {
	name = 'userUpdate' as const;

	async run(oldUser: User, newUser: User) {
		if (oldUser.username !== newUser.username) {
			const updateResult = await updateUsername(newUser.id, newUser.username);
			if (!updateResult.ok) {
				logger.error(updateResult.error.message, updateResult.error.debug());
			}
		}
		if (oldUser.displayName !== newUser.displayName) {
			const updateResult = await updateDisplayName(newUser.id, newUser.displayName);
			if (!updateResult.ok) {
				logger.error(updateResult.error.message, updateResult.error.debug());
			}
		}
		if (oldUser.avatar !== newUser.avatar) {
			const updateResult = await updateAvatar(newUser.id, newUser.avatar || undefined);
			if (!updateResult.ok) {
				logger.error(updateResult.error.message, updateResult.error.debug());
			}
		}
	}
}