import type {Commands} from './commands.type';

export const commandsConfig = {
	annonceevent: {
		name: 'annonceevent',
		description: 'Envoie l\'évent partout',
		options: {
			link: {
				name: 'lien',
				description: 'lien ou id du message à copier'
			}
		},
		exec: {
			invalidArgument: 'valeur invalide reçu dans l\'argument !',
			invalidChannel: 'le lien du salon est invalide',
			invalidMessage: 'Le lien ou l\'id du message est invalide'
		},
		other: {
			buttons: {
				valid: 'valider',
				refuse: 'annuler'
			}
		}
	}
} satisfies Commands;