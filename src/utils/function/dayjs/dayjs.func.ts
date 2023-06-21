import type {Dayjs} from 'dayjs';

export const calculateDayOfCustomWeek = (referenceDate: Dayjs, targetDate: Dayjs, base = 7): number => {
	// Normalize the dates to start from the same time (midnight)
	const referenceStartOfDay = referenceDate.startOf('day');
	const targetStartOfDay = targetDate.startOf('day');

	// Calculate the number of days in the time difference
	const daysDifference = targetStartOfDay.diff(referenceStartOfDay, 'day');

	// Calculate the position in the two-week loop based on the days difference
	return Math.abs((daysDifference % base)) + 1;
};