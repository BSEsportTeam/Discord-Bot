import {totalXp} from '$core/utils/xp/const/total_xp.const';

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