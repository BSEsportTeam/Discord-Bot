import type {MessageReference} from './announce_event.type';

export const getMessageReference = (link: string): MessageReference|null => {
	if (link.includes('/') && new RegExp('https:\\/\\/([a-z]*\\.|)discord\\.com\\/channels.*[0-9]+\\/[0-9]+\\/[0-9]+').test(link)) {
		const split = link.split('/');

		if (!isValidSnowflake(split[5]) || !isValidSnowflake(split[6])) return null;
		return {channelId: split[5], messageId: split[6]};
	} else if (isValidSnowflake(link)) return {messageId: link};
	else return null;
};

const isValidSnowflake = (id: string): boolean => {
	if (!id.match(/^\d+$/)) return false;
	return BigInt(id).toString() === id && id.length >= 15 && id.length <= 22;
};