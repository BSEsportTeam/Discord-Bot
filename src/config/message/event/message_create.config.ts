import type {BaseMessage} from '$core/config/message';

export const messageCreateConfig = {
	bump: {
		title: 'Merci du bump ! 🎉',
		description: 'Merci à {mention} d\'avoir bump le serveur ! N\'hésitez pas à revenir dans 2h pour bumper le serveur à nouveau !\n\n' +
			'Bumps journaliers : **{bumps}/{bumpsMax}**\n' +
			'Récompense : **{xp} XP !**'
	}
} satisfies Record<string, BaseMessage>;