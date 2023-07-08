import type {XpInfos} from '$core/config/guilds';
import {LevelUpRoleType} from '$core/config/guilds';

export const xpConfig: XpInfos = {
	enable: true,
	levelUpRoles: {
		'1': {
			name: 'Mon xp',
			id: '915785078360137789',
			type: LevelUpRoleType.CUMULATIVE
		},
		'5': {
			name: 'Pirate solitaire',
			id: '870957571110993931',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu débutes en tant que pirate débutant !'
		},
		'10': {
			name: 'Pirate membre d\'équipage',
			id: '869996729339088916',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu commences à prendre tes marques dans l\'équipage ça fait plaisir !',
		},
		'20': {
			name: 'Sous-Capitaine',
			id: '870958128890511380',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Ça commence à devenir vraiment intéressant encore quelques petits efforts et tu deviendras Capitaine ! ',
		},
		'30': {
			name: 'Capitaine',
			id: '870958587755757588',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu as déjà atteint le rôle de Capitaine ?! Es-tu prêt à aller plus haut ?',
		},
		'40': {
			name: 'Empereur pirate',
			id: '870958712746016778',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Félicitations tu deviens l\'empereur de tous nos petits membres pirates !',
		},
		'50': {
			name: 'Seigneur des Pirates',
			id: '870958891633082429',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu as encore évolué dans la hiérarchie, mais quand est-ce que tu vas t\'arrêter ? ',
		},
		'75': {
			name: 'Pirate Légendaire',
			id: '870959036605009961',
			type: LevelUpRoleType.EVOLUTIONARY,
			message: 'Tu deviens le boss des pirates, celui que l\'on retient à jamais même après sa mort !?',
		}
	},
	boosterRole: '783758427062665267',
	xpBoostRole: '870955934246129695',
	disablesChannels: ['913465443447091210'],
	levelUpChannel: '870945147460935721'
};