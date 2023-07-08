import type {XpInfos} from '$core/config/guilds';
import {LevelUpRoleType} from '$core/config/guilds';

export const xpConfig: XpInfos = {
	enable: true,
	levelUpRoles: {
		'1': {
			name: 'Mon xp',
			id: '913595839279153164',
			type: LevelUpRoleType.CUMULATIVE
		},
		'5': {
			name: 'Lionceau',
			id: '913596669927505991',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu découvres la vie de lion, il est maintenant temps de grandir !'
		},
		'10': {
			name: 'Apprenti Lion',
			id: '913596603586187284',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Il faut continuer ainsi, c\'est que le début de ton aventure de lion !',
		},
		'20': {
			name: 'Lion Confirmé',
			id: '913596553791414302',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu commences à prendre tes marques dans la meute ça fait plaisir !',
		},
		'30': {
			name: 'Lion Adulte',
			id: '913596492739133451',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Ça commence à devenir vraiment intéressant encore quelques petits efforts et tu deviendras un Lion Ancestral !',
		},
		'40': {
			name: 'Lion Ancestral',
			id: '913596439739924480',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu as déjà atteint le rôle de Lion Ancestral ?! Es-tu prêt à aller plus haut ?',
		},
		'50': {
			name: 'Lion des Neiges',
			id: '913596389215309854',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Félicitations tu deviens un lion très apprécié dans la hiérarchie  !',
		},
		'75': {
			name: 'Lion Légendaire',
			id: '913596345791709214',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu as encore évolué dans la hiérarchie, mais quand est-ce que tu vas t\'arrêter ?',
		},
		'100': {
			name: 'Roi Lion',
			id: '913596289525092423',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu deviens le boss de tous les autres lions, celui que l\'on retient à jamais même après sa mort !',
		},
	},
	boosterRole: '878635450795958295',
	xpBoostRole: '913596183249829929',
	disablesChannels: ['914175273644228658'],
	levelUpChannel: '913595353494847529'
};