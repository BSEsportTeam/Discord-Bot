import type {BaseMessage} from '$core/config/message/message.type';

export const messageConfig = {
	commandHandler: {
		error: {
			description: 'Une erreur inconue est arrivé, veillez contacter Arcoz si l\'erreur se reproduit !',
			title: 'Erreur interne '
		}
	},
	button: {
		authorOnly: 'seul l\'autour de la commande peux utilisé ce bouton'
	}
} satisfies Record<string, BaseMessage>;