import type {BaseMessage} from '$core/config/message';

export const tasks = {
	brawlStarsLdc: {
		startLdc: {
			description: 'Bonjour les lions :lion_face:\n' +
				'\n' +
				'Aujourd’hui nous vous invitons à faire vos quêtes pour amasser le maximum points afin de débloquer les récompenses pour tous les membres de vos clubs ! :muscle:\n' +
				'\n' +
				'Bonne journée à tous et bon courage pour vos quêtes !:v_tone2:',
			imageUrl: 'https://i.imgur.com/EdQRZrC.jpg'
		},
		endLdc: {
			description: 'Bonjour les lions :lion_face:\n' +
				'\n' +
				'Aujourd’hui nous commençons un nouveau jour de LDC, n’oubliez pas de faire vos tickets et de les faire en équipe' +
				'en mettant un message sur le chat du club (Jeu ou Discord) pour de meilleurs résultats ! :muscle:\n' +
				'\n' +
				'Bonne journée à tous et bon courage pour vos combats !:v_tone2:',
			imageUrl: 'https://i.imgur.com/zauuzJH.jpg'
		},
		jdc: {
			description: 'Bonjour les lions :lion_face:\n' +
				'\n' +
				'C’est bientôt la fin de la LDC d’aujourd’hui, si vous n’avez pas fait vos tickets c’est le moment ou jamais ! En espérant voir' +
				'de bons résultats et monter dans les ligues supérieures ! :trophy:\n' +
				'\n' +
				'Bonne journée à tous et bon courage pour vos combats !:v_tone2:',
			imageUrl: 'https://i.imgur.com/VRFqHo5.jpg'
		}
	}
} satisfies Record<string, BaseMessage>;