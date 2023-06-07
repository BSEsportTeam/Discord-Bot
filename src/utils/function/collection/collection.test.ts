import {describe, expect, it} from 'vitest';
import {Collection} from 'discord.js';

import {getArrayMergedFromCollectionValues} from './collection.util';

describe('getArrayMergedFromCollectionValues', () => {
	it('returns an empty array if the collection is empty', () => {
		const collection: Collection<string, number[]> = new Collection();
		const result = getArrayMergedFromCollectionValues(collection);
		expect(result).toEqual([]);
	});

	it('merges the values from the collection', () => {
		const collection: Collection<string, number[]> = new Collection();
		collection.set('a', [1, 2, 3]);
		collection.set('b', [4, 5]);
		collection.set('c', []);

		const result = getArrayMergedFromCollectionValues(collection);
		expect(result).toEqual([1, 2, 3, 4, 5]);
	});
});
