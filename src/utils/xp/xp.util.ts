import {totalXp} from '$core/utils/xp/const/total_xp.const';
import {levelUpNeeded} from '$core/utils/xp/const/to_level_up.const';

export const calculateLevel = (xp: number): number => {
	let level = 0;

	for (const [key, value] of Object.entries(totalXp)) {
		if (xp >= value) {
			level = parseInt(key, 10);
		} else {
			break;
		}
	}

	return level;
};

export const getXpForLevel = (level: number): number => {
	return levelUpNeeded[level+1] || levelUpNeeded[500];
};

export const getLevelProgress = (xp: number): number => {
	const level = calculateLevel(xp);

	return xp - totalXp[level];
};