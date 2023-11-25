import type {BaseMessage} from '$core/config/message/message.type';

export const messageConfig = {
	interactionHandler: {
		error: {
			description: 'Une erreur inconue est arrivé, veillez contacter **Arcoz** si l\'erreur se **reproduit !**',
			title: '__Erreur interne !__',
		},
	},
	button: {
		authorOnly: {
			title: 'Non autorisé',
			description: 'seul l\'auteur de la commande peut utiliser ce bouton !',
		},
		confirmSystem: {
			cancelMessage: 'Annulé avec succes',
			confirmButton: 'Valider',
			cancelButton: 'Annuler',
		},
	},
	xp: {
		levelUp: '**Félicitations** {mention}, tu viens de passer au niveau {level} !',
		roleUp: '**Félicitations** {pseudo}, tu viens d\'obtenir le rôle **{role}** ! _**{message}**_',
	},
	logs: {
		ready: {
			readyTitle: 'Bot connecté !',
			readyDescription: 'Le bot à été lancé avec succès avec la version **{version} !**',
		},
		xpMovement: {
			title: 'Un nouveau mouvement d\'xp à été fait',
			description: 'Id: {id} \n'
				+ 'nombre d\'xp : {xp}\n'
				+ 'par : {mention1}\n'
				+ 'pour : {mention2}\n'
				+ 'dans : {guild}\n'
				+ 'date : {time}\n'
				+ 'cause : {cause}\n'
				+ 'raison : {raison}',
		},
	},
} satisfies Record<string, BaseMessage>;