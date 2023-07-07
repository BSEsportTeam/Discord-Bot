export const generateRandomValue = (max: number): number => {
	const random = Math.random();
	return Math.floor(random * (max + 1));
};