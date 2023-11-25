import {describe, expect, it} from 'vitest';
import {getMessageReference} from './announce_event.util';

describe('getMessageReference', () => {
	it('should return null for invalid links', () => {
		expect(getMessageReference('')).toBeNull();
		expect(getMessageReference('https://example.com')).toBeNull();
		expect(getMessageReference('1234')).toBeNull();
		expect(getMessageReference('12aa')).toBeNull();
	});

	it('should return a MessageReference object for valid links', () => {
		expect(getMessageReference('https://canary.discord.com/channels/1096123374092161024/1096123375480475711/1112094405080395877')).toEqual({
			channelId: '1096123375480475711',
			messageId: '1112094405080395877',
		});

		expect(getMessageReference('https://discord.com/channels/1096123374092161024/1096123375312707612/1112706382160994305')).toEqual({
			channelId: '1096123375312707612',
			messageId: '1112706382160994305',
		});
	});

	it('should return a MessageReference object for valid message IDs', () => {
		expect(getMessageReference('1112706382160994305')).toEqual({
			messageId: '1112706382160994305',
		});

		expect(getMessageReference('1112095028018434058')).toEqual({
			messageId: '1112095028018434058',
		});
	});
});