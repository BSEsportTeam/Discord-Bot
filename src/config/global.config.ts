import {serversConfig} from '$core/config/servers/servers.config';


export const colors = {
	success: 0x27E412,
	error: 0xFF8000,
	notAllowed: 0xFF0000
};

const globalConfig = {
	eventAnnouncementPingReplacer: '{ping}',
	eventAnnouncementEmojis: [
		'❤️',
		'🔜',
		'<un:1112094976654974986>'
	]

};

export const config = {
	global: globalConfig,
	servers: serversConfig
};




