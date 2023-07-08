import type {XpInfos} from '$core/config/guilds';
import {LevelUpRoleType} from '$core/config/guilds';

export const xpConfig: XpInfos = {
	enable: true,
	levelUpRoles: {
		'1': {
			name: 'Mon xp',
			id: '915789457318371328',
			type: LevelUpRoleType.CUMULATIVE
		},
		'5': {
			name: 'Lionceau',
			id: '897599315063750657',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu découvres la vie de lion, il est maintenant temps de grandir !'
		},
		'10': {
			name: 'Apprenti Lion',
			id: '897599286626381905',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Il faut continuer ainsi, c\'est que le début de ton aventure de lion !',
		},
		'20': {
			name: 'Lion Confirmé',
			id: '897599254577696828',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu commences à prendre tes marques dans la meute ça fait plaisir !',
		},
		'30': {
			name: 'Lion Adulte',
			id: '897599164320468993',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Ça commence à devenir vraiment intéressant encore quelques petits efforts et tu deviendras un Lion Ancestral !',
		},
		'40': {
			name: 'Lion Ancestral',
			id: '897599134054359070',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu as déjà atteint le rôle de Lion Ancestral ?! Es-tu prêt à aller plus haut ?',
		},
		'50': {
			name: 'Lion des Neiges',
			id: '897599097618440302',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Félicitations tu deviens un lion très apprécié dans la hiérarchie  !',
		},
		'75': {
			name: 'Lion Légendaire',
			id: '897599062923178016',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu as encore évolué dans la hiérarchie, mais quand est-ce que tu vas t\'arrêter ?',
		},
		'100': {
			name: 'Roi Lion',
			id: '897599026281709568',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu deviens le boss de tous les autres lions, celui que l\'on retient à jamais même après sa mort !',
		},
	},
	boosterRole: '906717026658172962',
	xpBoostRole: '897233140769239071',
	disablesChannels: ['891771420537937980'],
	levelUpChannel: '891771476913561670'
};