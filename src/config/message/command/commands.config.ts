import type {Commands} from './commands.type';

export const commandsConfig = {
	announceEvent: {
		name: 'annonceevent',
		description: 'Envoie l\'évent partout',
		options: {
			link: {
				name: 'lien',
				description: 'Lien ou id du message à copier'
			}
		},
		exec: {
			invalidArgument: 'Valeur invalide reçu dans l\'argument !',
			invalidChannel: 'Le lien du salon est invalide',
			invalidMessage: 'Le lien ou l\'id du message est invalide',
			button: {
				success: '**L\'annonce à été envoyé avec succès dans {number} serveurs !**',
				failed: '**L\'annonce à été envoyé, mais certains serveurs ont u des erreurs, voici la liste des serveurs avec erreur :** \n- {serverrors}',
				cancel: '**Annulé avec succès !**'
			}
		},
		other: {
			buttons: {
				valid: 'Valider',
				refuse: 'Annuler'
			}
		}
	},
	adminXp: {
		name: 'adminxp',
		description: 'Modifie les xp des membres.',
		subcmds: {
			add: {
				name: 'ajouter',
				description: 'Ajouter de l\'xp à un membre',
				options: {
					member: {
						name: 'membre',
						description: 'A quel membre souhaitez vous ajouter de de l\'expérience ?'
					},
					xp: {
						name: 'experience',
						description: 'Combien d\'expérience voulez vous lui ajouter ?'
					},
					reason: {
						name: 'raison',
						description: 'Pour quel raison voulez vous ajouter de l\'expérience'
					}
				}
			},
			remove: {
				name: 'retirer',
				description: 'Retirer de l\'xp à un membre',
				options: {
					member: {
						name: 'membre',
						description: 'A quel membre souhaitez vous retirer de de l\'expérience ?'
					},
					xp: {
						name: 'experience',
						description: 'Combien d\'expérience voulez vous lui retirer ?'
					},
					reason: {
						name: 'raison',
						description: 'Pour quel raison voulez vous retirer de l\'expérience'
					}
				}
			}
		},
		exec: {
			add: {
				succes: {
					title: 'Ajout d\'experience',
					description: '**{xp} xp** ont été ajoutés à {user} !\n' +
						'il est maintenant **niveau {level}** avec **{xp} xp** !',
					reason: '\nPour la raison `{reason}`'
				}
			},
			remove: {
				succes: {
					title: 'Retrait d\'experience',
					description: '**{xp} xp** ont été retirés à {user} !\n' +
						'il est maintenant **niveau {level}** avec **{xp} xp** !',
					reason: '\nPour la raison `{reason}`'
				}
			}
		}
	},
	dropXp: {
		name: 'dropxp',
		description: 'Envoyez un drop d\'xperience',
		options: {
			amount: {
				name: 'xp',
				description: 'Combien d\'experience voulez vous droper ?'
			}
		},
		exec: {
			drop: {
				title: 'Oh un drop ? :eyes: Soyez le premier à le récuperer !',
				description: 'Gagnez **{xp} xp** en cliquant sur le bouton ci-dessous.'
			},
			success: 'Le drop à été envoyer avec succès !',
			claimed: 'Bravo {tag} ! Tu viens de gagner **{xp} xp** !',
			timeout: 'Oh dommage, personne à récupérer le drop !',
			noAuthor: 'Vous pouvez pas récupérer votre propre drop !',
			button: 'Récupérer !'
		}
	}
} satisfies Commands;