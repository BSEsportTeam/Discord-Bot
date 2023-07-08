import type {XpInfos} from '$core/config/guilds';
import {LevelUpRoleType} from '$core/config/guilds';

export const xpConfig: XpInfos = {
	enable: true,
	levelUpRoles: {
		'1': {
			name: 'Mon xp',
			id: '913597473258344448',
			type: LevelUpRoleType.CUMULATIVE
		},
		'5': {
			name: 'Lionceau',
			id: '913598398953824316',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu découvres la vie de lion, il est maintenant temps de grandir !'
		},
		'10': {
			name: 'Apprenti Lion',
			id: '913598330821554216',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Il faut continuer ainsi, c\'est que le début de ton aventure de lion !',
		},
		'20': {
			name: 'Lion Confirmé',
			id: '913598266518695946',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu commences à prendre tes marques dans la meute ça fait plaisir !',
		},
		'30': {
			name: 'Lion Adulte',
			id: '913598200521293844',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Ça commence à devenir vraiment intéressant encore quelques petits efforts et tu deviendras un Lion Ancestral !',
		},
		'40': {
			name: 'Lion Ancestral',
			id: '913598083915456594',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu as déjà atteint le rôle de Lion Ancestral ?! Es-tu prêt à aller plus haut ?',
		},
		'50': {
			name: 'Lion des Neiges',
			id: '913598038612787301',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Félicitations tu deviens un lion très apprécié dans la hiérarchie  !',
		},
		'75': {
			name: 'Lion Légendaire',
			id: '913597981159223296',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu as encore évolué dans la hiérarchie, mais quand est-ce que tu vas t\'arrêter ?',
		},
		'100': {
			name: 'Roi Lion',
			id: '913597795108266045',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu deviens le boss de tous les autres lions, celui que l\'on retient à jamais même après sa mort !',
		},
	},
	boosterRole: '924804948896669697',
	xpBoostRole: '913597624660164659',
	disablesChannels: [
		'914175391722262538'
	],
	levelUpChannel: '913597038908825620'
};