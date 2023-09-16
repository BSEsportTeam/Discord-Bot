import type {BaseMessage} from '$core/config/message';

export const messageCreateConfig = {
	bump: {
		title: 'Merci du bump ! 🎉',
		description: 'Merci à {mention} d\'avoir bump/boost le serveur ! N\'hésitez pas à revenir dans 1-2h pour bumper le serveur à nouveau !\n\n' +
			'xp journaliers : **{curentXp}/{maxXp}**\n' +
			'Récompense : **{xp} XP !**'
	}
} satisfies Record<string, BaseMessage>;