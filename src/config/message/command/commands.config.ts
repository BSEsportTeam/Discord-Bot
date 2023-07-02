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
				failed: '**L\'annonce à été envoyé, mais certains serveurs ont eu des erreurs, voici la liste des serveurs avec erreur :** \n- {serverrors}',
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
	},
	level: {
		name: 'niveau',
		description: 'Connaitre son niveau ou celui de quelqu\'un d\'autre',
		options: {
			member: {
				name: 'membre',
				description: 'De quel membre voulez vous connaitre le niveau ?'
			}
		},
		exec: {
			title: 'Information de {username}',
			description: 'Niveau : **{level}**\n' +
				'Xp Total : **{xpTotal} xp**\n' +
				'Progression du niveau : **{curentXp}/{xpToLevelUp} xp**\n' +
				'Position : **{rank}**',
			noUser: 'Aucun utilisateur à été retrouver dans la base de données !',

		}
	},
	topLevel: {
		name: 'topniveau',
		description: 'Options le top niveau du serveur !',
		options: {
			page: {
				name: 'page',
				description: 'Quel page faut il affiché ? (Optionel)'
			},
			global: {
				name: 'global',
				description: 'Classement global ? (par defaultt false)'
			}
		},
		exec: {
			simpled: {
				titleGuild: 'Top 3 du serveur !',
				titleGlobal: 'Top 3 global !',
				description: ':first_place: {mention}\n' +
					':black_medium_square: ➥ Niveau {level} ({xp} xp)\n' +
					':second_place: {mention}\n' +
					':black_medium_square: ➥ Niveau {level} ({xp} xp)\n' +
					':third_place: {mention}\n' +
					':black_medium_square: ➥ Niveau {level} ({xp} xp)',
				selfTop: '\n\n`#{position}` {mention}\n' +
					':black_medium_square: ➥ Niveau {level} ({xp} xp)'
			},
			detailed: {
				titleGuild: 'Classement du serveur page {page}',
				tileGlobal: 'Classement global page {page}',
				description: '{position}. {mention}\n' +
					'➥ Niveau {level} ({xp} xp)',
				empty: 'Aucune données pour cette page'
			}
		},
		other: {
			buttons: {
				next: 'Page suivante',
				before: 'Page précédente',
				detailed: 'Classement détaillé'
			}
		}
	},
	clubInfo: {
		name: 'clubinfo',
		description: 'Optenez des informations à propos d\'un club !',
		options: {
			club: {
				name: 'club',
				description: 'Nom du club'
			}
		},
		exec: {
			noClub: {
				title: 'Pas de club trouvé !',
				description: 'Le club n\'a pas été trouvé, veillez contacter Arcoz.'
			},
			apiError: {
				title: 'Une erreur d\'api est apparu',
				description: 'Une erreur d\'api est arrivé, il est possible que l\'api sois hors ligne, reessayé la commande dans 30min, et si l\'erreur se reproduit, contacter Arcoz'
			},
			clubInfos: {
				title: 'Informations sur {clubName}',
				basic: {
					title: 'Informations basique',
					description: 'Type de club :              __{type}__\n' +
						'Membres :                    {curentMembers}/{MaxMembers} membres\n' +
						'Trophées requis :        {tr} 🏆\n' +
						'Accès :                          {access}',
					values: {
						types: {
							leader: 'Ladder',
							ldc: 'LDC',
							chill: 'Chill'
						},
						access: {
							open: 'Ouvert',
							inviteOnly: 'Sur invitation',
							closed: 'Fermé',
							unknown: 'Inconue'
						}
					}
				},
				rank: {
					title: 'Classements',
					description: 'Trophées actuel :        {tr} 🏆',
					descriptionComplements: {
						bestGlobal: '\nMeilleur top monde :  {rank}',
						currentGlobal: '\nTop monde actuel :     {rank}',
						bestLocal: '\nMeilleur top fr :            {rank}',
						currentLocal: '\nTop fr actuel :               {rank}'
					},
					rankValue: {
						noRanked: 'non classé',
						ranked: '{top} 🎖️'
					}
				}
			}
		}
	}
} satisfies Commands;