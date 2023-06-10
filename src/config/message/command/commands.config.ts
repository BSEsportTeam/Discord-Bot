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
			invalidMessage: 'Le lien ou l\'id du message est invalide',
			button: {
				success: '**l\'annonce à été envoyé avec succès dans {number} serveurs !**',
				failed: '**l\'annonce à été envoyé, mais certains serveurs ont u des erreurs, voici la liste des serveurs avec erreur :** \n- {serverrors}',
				cancel: '**Annulé avec succès !**'
			}
		},
		other: {
			buttons: {
				valid: 'valider',
				refuse: 'annuler'
			}
		}
	}
} satisfies Commands;