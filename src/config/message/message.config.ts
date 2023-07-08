import type {BaseMessage} from '$core/config/message/message.type';

export const messageConfig = {
	interactionHandler: {
		error: {
			description: 'Une erreur inconue est arrivé, veillez contacter **Arcoz** si l\'erreur se **reproduit !**',
			title: '__Erreur interne !__'
		}
	},
	button: {
		authorOnly: {
			title: 'Non autorisé',
			description: 'seul l\'auteur de la commande peut utiliser ce bouton !'
		}
	},
	xp: {
		levelUp: '**Félicitations** {mention}, tu viens de passer au niveau {level} !',
		roleUp: '**Félicitations** {pseudo}, tu viens d\'optenir le role **{role}** ! _**{message}**_'
	}
} satisfies Record<string, BaseMessage>;