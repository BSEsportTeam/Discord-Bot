import type {Snowflake} from 'discord-api-types/globals';
import type {XpMovementCause} from '@prisma/client';
import type {Result} from 'rustic-error';
import {error, ok} from 'rustic-error';
import type {XpMovementResult} from '$core/utils/xp/xp.type';
import {addXpToMember} from '$core/handlers/database/xp';
import {calculateLevel, checkXpRoles, sendLevelUpMessage} from '$core/utils/xp/xp.util';
import {createXpMovement} from '$core/handlers/database/xp_movement/xp_movement.func';
import {logger} from '$core/utils/logger';

export const addXp = async (
	userId: Snowflake,
	guildId: Snowflake,
	amount: number,
	cause: XpMovementCause|null = null,
	causeBy: Snowflake|'unknown' = 'unknown',
	reason = ''
): Promise<Result<XpMovementResult|null, Error>> => {

	if (amount === 0) {
		return error(new Error('invalid amount of xp, get 0'));
	}

	const result = await addXpToMember(userId, guildId, amount);

	if (!result.ok) {
		return error(result.error);
	}

	const oldLevel = calculateLevel(result.value - amount);
	const newLevel = calculateLevel(result.value);

	if (newLevel > oldLevel) {
		await sendLevelUpMessage(userId, guildId, newLevel);
		await checkXpRoles(userId, guildId, oldLevel, newLevel);
	}

	if (cause !== null) {
		const movResult = await createXpMovement({
			xp: amount,
			guildId,
			forUserId: userId,
			byUserId: causeBy,
			reason,
			cause: cause
		});

		if (!movResult.ok) {
			logger.error('Failed to create XpMovement Log !', {...movResult.error.debug(), guildId, forUser: userId, by: causeBy});
		}
	}

	return ok({
		xp: result.value,
		level: newLevel
	});
};