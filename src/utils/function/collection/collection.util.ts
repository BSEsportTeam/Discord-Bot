import type {Collection} from 'discord.js';

export const getArrayMergedFromCollectionValues = <K, V>(collection: Collection<K, V[]>): V[] => {
	const values: V[] = [];
	for (const value of collection.values()) {
		values.push(...value);
	}
	return values;
};