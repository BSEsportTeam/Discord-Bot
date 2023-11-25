import type {BrawlStarsGuild} from '../../guild.type';
import {clubsList} from './clubs.config';
import {xpConfig} from './xp.config';
import {pubMessage} from './pub_message.config';

export const brawlStarsGuildConfig: BrawlStarsGuild = {
	name: 'brawlStars',
	guildId: '524526538151034892',
	eventAnnouncements: {
		channelId: '796114514290540595',
		roleId: '799747893451161631',
		enable: true,
	},
	autoPing: {
		roles: {
			'bs immortals': '535073727717572618',
			'bs esport pro': '524527311601532938',
			'bs prestige': '846110492559671316',
			'bs esport elite': '529697443936337962',
			'bs aries': '885982708331859998',
			'bs kings': '892478292748300338',
			'bs assembly': '524527525330944000',
			'bs demons': '885982563087310858',
			'bs esport': '524527442564481024',
			'bs legends': '737019244109103124',
			'bs myths': '894288274162585601',
			'bs angels': '882357284716576788',
			'bs shadows': '882357941959819304',
			'bs heroes': '885983257047478273',
			'bs olympus': '814131091279052881',
			//'bs warriors': '885982619152551956',
			//'bs brotherhood': '712264783398830082'
		},
		channel: '976237938453139486',
	},
	inviteLink: 'https://discord.gg/aWPCgqz',
	xp: xpConfig,
	bumpChannel: '1006678429300695121',
	pubMessages: pubMessage,
	clubs: clubsList,
};