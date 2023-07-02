import {describe, expect, it} from 'vitest';
import {calculateDayOfCustomWeek} from './dayjs.func';
import {DayJS} from './dayjs';

describe('calculateTwoWeekPosition', () => {
	it('returns the correct position when target date is ahead of reference date (base = 7)', () => {
		const referenceDate = DayJS('2023-06-01');
		const targetDate = DayJS('2023-06-10');
		const expectedPosition = 3;

		const result = calculateDayOfCustomWeek(referenceDate, targetDate);
		expect(result).toBe(expectedPosition);
	});

	it('returns the correct position when target date is behind reference date (base = 7)', () => {
		const referenceDate = DayJS('2023-06-15');
		const targetDate = DayJS('2023-06-02');
		const expectedPosition = 7;

		const result = calculateDayOfCustomWeek(referenceDate, targetDate);
		expect(result).toBe(expectedPosition);
	});

	it('returns the correct position when target date is ahead of reference date (base = 14)', () => {
		const referenceDate = DayJS('2023-06-01');
		const targetDate = DayJS('2023-06-15');
		const expectedPosition = 1;

		const result = calculateDayOfCustomWeek(referenceDate, targetDate, 14);
		expect(result).toBe(expectedPosition);
	});

	it('returns the correct position when target date is behind reference date (base = 14)', () => {
		const referenceDate = DayJS('2023-06-15');
		const targetDate = DayJS('2023-06-02');
		const expectedPosition = 14;

		const result = calculateDayOfCustomWeek(referenceDate, targetDate, 14);
		expect(result).toBe(expectedPosition);
	});

	it('returns the correct position when target date is the same as reference date (base = 1)', () => {
		const referenceDate = DayJS('2023-06-01');
		const targetDate = DayJS('2023-06-01');
		const expectedPosition = 1;

		const result = calculateDayOfCustomWeek(referenceDate, targetDate, 1);
		expect(result).toBe(expectedPosition);
	});

	it('returns the correct position when target date has a time difference of hours (base = 7)', () => {
		const referenceDate = DayJS('2023-06-01 09:28:47');
		const targetDate = DayJS('2023-06-02 19:12:13');
		const expectedPosition = 2;

		const result = calculateDayOfCustomWeek(referenceDate, targetDate);
		expect(result).toBe(expectedPosition);
	});

	it('returns the correct position when target date has a large difference (base = 7)', () => {
		const referenceDate = DayJS('2023-06-01');
		const targetDate = DayJS('2023-07-30');
		const expectedPosition = 4;

		const result = calculateDayOfCustomWeek(referenceDate, targetDate);
		expect(result).toBe(expectedPosition);
	});
});
