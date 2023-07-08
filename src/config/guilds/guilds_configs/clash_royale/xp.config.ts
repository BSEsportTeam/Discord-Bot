import type {XpInfos} from '$core/config/guilds';
import {LevelUpRoleType} from '$core/config/guilds';

export const xpConfig: XpInfos = {
	enable: true,
	levelUpRoles: {
		'1': {
			name: 'Mon xp',
			id: '870725118744207360',
			type: LevelUpRoleType.CUMULATIVE
		},
		'5': {
			name: 'Lionceau',
			id: '884427193084678204',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu découvres la vie de lion, il est maintenant temps de grandir !'
		},
		'10': {
			name: 'Apprenti Lion',
			id: '884427282557575199',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Il faut continuer ainsi, c\'est que le début de ton aventure de lion !',
		},
		'20': {
			name: 'Lion Confirmé',
			id: '884427367865520228',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu commences à prendre tes marques dans la meute ça fait plaisir !',
		},
		'30': {
			name: 'Lion Adulte',
			id: '884427429794422825',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Ça commence à devenir vraiment intéressant encore quelques petits efforts et tu deviendras un Lion Ancestral !',
		},
		'40': {
			name: 'Lion Ancestral',
			id: '884427559134187530',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu as déjà atteint le rôle de Lion Ancestral ?! Es-tu prêt à aller plus haut ?',
		},
		'50': {
			name: 'Lion des Neiges',
			id: '884427626641502218',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Félicitations tu deviens un lion très apprécié dans la hiérarchie  !',
		},
		'75': {
			name: 'Lion Légendaire',
			id: '884427697160335450',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu as encore évolué dans la hiérarchie, mais quand est-ce que tu vas t\'arrêter ?',
		},
		'100': {
			name: 'Roi Lion',
			id: '884427748255342663',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu deviens le boss de tous les autres lions, celui que l\'on retient à jamais même après sa mort !',
		},
	},
	boosterRole: '850267710847451176',
	xpBoostRole: '884425902115663923',
	disablesChannels: ['914174587355406396'],
	levelUpChannel: '870349987626778684'
};