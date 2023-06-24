import type {BaseMessage} from '$core/config/message';

export const messageCreateConfig = {
	bump: {
		title: 'Merci du bump ! :tada:',
		description: 'Merci à {mention} d\'avoir bump le serveur ! Hésitez pas à revenir dans 2h pour bumper le serveur à nouveau ! \n\n' +
			'bumps journaliers : **{bumps}/{bumpsMax}**\n' +
			'récompense : **{xp} xp !**'
	}
} satisfies Record<string, BaseMessage>;