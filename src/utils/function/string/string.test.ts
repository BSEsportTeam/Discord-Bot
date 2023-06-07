import {describe, expect, it} from 'vitest';
import {addMessageParams} from './string.util';

describe('addMessageParams', () => {
	it('should handle a message with only one placeholder', () => {
		const message = 'Hello, ${1}!';
		const options = ['John'];
		const expected = 'Hello, John!';
		const result = addMessageParams(message, ...options);
		expect(result).toBe(expected);
	});

	it('should handle empty message', () => {
		const message = '';
		const options: string[] = [];
		const expected = '';
		const result = addMessageParams(message, ...options);
		expect(result).toBe(expected);
	});

	it('should handle no options', () => {
		const message = 'Hello, world!';
		const options: string[] = [];
		const expected = 'Hello, world!';
		const result = addMessageParams(message, ...options);
		expect(result).toBe(expected);
	});

	it('should handle multiple options', () => {
		const message = '${1} likes ${2} and ${3}';
		const options = ['Alice', 'cats', 'dogs'];
		const expected = 'Alice likes cats and dogs';
		const result = addMessageParams(message, ...options);
		expect(result).toBe(expected);
	});

	it('should replace placeholders used multiple times', () => {
		const message = 'Hello, ${1}! ${1} is your favorite color, right ${1}?';
		const options = ['Blue'];
		const expected = 'Hello, Blue! Blue is your favorite color, right Blue?';
		const result = addMessageParams(message, ...options);
		expect(result).toBe(expected);
	});
	it('should handle more options than placeholders', () => {
		const message = 'Hello, ${1}!';
		const options = ['John', 'Doe'];
		const expected = 'Hello, John!';
		const result = addMessageParams(message, ...options);
		expect(result).toBe(expected);
	});

	it('should handle more placeholders than options', () => {
		const message = 'Hello, ${1} and ${2}!';
		const options = ['John'];
		const expected = 'Hello, John and ${2}!';
		const result = addMessageParams(message, ...options);
		expect(result).toBe(expected);
	});
});
