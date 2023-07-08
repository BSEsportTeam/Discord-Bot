import type {XpInfos} from '$core/config/guilds';
import {LevelUpRoleType} from '$core/config/guilds';

export const xpConfig: XpInfos = {
	enable: true,
	levelUpRoles: {
		'1': {
			name: 'Mon xp',
			id: '915650263132569630',
			type: LevelUpRoleType.CUMULATIVE
		},
		'5': {
			name: 'Lionceau',
			id: '900519372920062082',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu découvres la vie de lion, il est maintenant temps de grandir !'
		},
		'10': {
			name: 'Apprenti Lion',
			id: '900519541799530527',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Il faut continuer ainsi, c\'est que le début de ton aventure de lion !',
		},
		'20': {
			name: 'Lion Confirmé',
			id: '900519611865366559',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu commences à prendre tes marques dans la meute ça fait plaisir !',
		},
		'30': {
			name: 'Lion Adulte',
			id: '900519575593058315',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Ça commence à devenir vraiment intéressant encore quelques petits efforts et tu deviendras un Lion Ancestral !',
		},
		'40': {
			name: 'Lion Ancestral',
			id: '900519647164649533',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu as déjà atteint le rôle de Lion Ancestral ?! Es-tu prêt à aller plus haut ?',
		},
		'50': {
			name: 'Lion des Neiges',
			id: '900519675950170112',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Félicitations tu deviens un lion très apprécié dans la hiérarchie  !',
		},
		'75': {
			name: 'Lion Légendaire',
			id: '900519707868799077',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu as encore évolué dans la hiérarchie, mais quand est-ce que tu vas t\'arrêter ?',
		},
		'100': {
			name: 'Roi Lion',
			id: '900519742211751946',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu deviens le boss de tous les autres lions, celui que l\'on retient à jamais même après sa mort !',
		},
	},
	boosterRole: '853573023360352267',
	xpBoostRole: '900519240816271430',
	disablesChannels: ['900518150657953822'],
	levelUpChannel: '900518088770985994'
};