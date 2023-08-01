export const inverseNumber = (num: number): number => {
	if (num === 0) {
		return 0;
	}

	if (num < 0) {
		return Math.abs(num);
	}
	return -Math.abs(num);
};