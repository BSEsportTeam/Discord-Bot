export const inverseNumber = (num: number): number => {
	if (num === 0) {
		return 0;
	}

	if (num < 0) {
		return Math.abs(num);
	}
	return -Math.abs(num);
};

// change 1000000 to 1 000 000
export const stringifyNumber = (num: number, separator = ' '): string => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};