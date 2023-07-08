import type {Commands} from './commands.type';

export const commandsConfig = {
	announceEvent: {
		name: 'annonceevent',
		description: 'Envoie l\'événement partout',
		options: {
			link: {
				name: 'lien',
				description: 'Lien ou ID du message à copier'
			}
		},
		exec: {
			invalidArgument: 'Valeur invalide reçue dans l\'argument !',
			invalidChannel: 'Le lien du salon est invalide',
			invalidMessage: 'Le lien ou l\'ID du message est invalide',
			button: {
				success: '**L\'annonce a été envoyée avec succès dans {number} serveurs !**',
				failed: '**L\'annonce a été envoyée, mais certains serveurs ont eu des erreurs, voici la liste des serveurs avec erreurs :** \n- {serverrors}',
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
		description: 'Modifie les XP des membres.',
		subcmds: {
			add: {
				name: 'ajouter',
				description: 'Ajouter de l\'XP à un membre',
				options: {
					member: {
						name: 'membre',
						description: 'À quel membre souhaitez-vous ajouter de l\'expérience ?'
					},
					xp: {
						name: 'experience',
						description: 'Combien d\'expérience voulez-vous lui ajouter ?'
					},
					reason: {
						name: 'raison',
						description: 'Pour quelle raison voulez-vous ajouter de l\'expérience ?'
					}
				}
			},
			remove: {
				name: 'retirer',
				description: 'Retirer de l\'XP à un membre',
				options: {
					member: {
						name: 'membre',
						description: 'À quel membre souhaitez-vous retirer de l\'expérience ?'
					},
					xp: {
						name: 'experience',
						description: 'Combien d\'expérience voulez-vous lui retirer ?'
					},
					reason: {
						name: 'raison',
						description: 'Pour quelle raison voulez-vous retirer de l\'expérience ?'
					}
				}
			}
		},
		exec: {
			add: {
				succes: {
					title: 'Ajout d\'expérience',
					description: '**{xp} XP** ont été ajoutés à {user} !\n' +
						'Il est maintenant niveau **{level}** avec **{xp} XP** !',
					reason: '\nPour la raison `{reason}`'
				}
			},
			remove: {
				succes: {
					title: 'Retrait d\'expérience',
					description: '**{xp} XP** ont été retirés à {user} !\n' +
						'Il est maintenant niveau **{level}** avec **{xp} XP** !',
					reason: '\nPour la raison `{reason}`'
				}
			}
		}
	},
	dropXp: {
		name: 'dropxp',
		description: 'Envoyez un drop d\'expérience',
		options: {
			amount: {
				name: 'xp',
				description: 'Combien d\'expérience voulez-vous dropper ?'
			}
		},
		exec: {
			drop: {
				title: 'Oh un drop ? :eyes: Soyez le premier à le récupérer !',
				description: 'Gagnez **{xp} XP** en cliquant sur le bouton ci-dessous.'
			},
			success: 'Le drop a été envoyé avec succès !',
			claimed: 'Bravo {tag} ! Tu viens de gagner **{xp} XP** !',
			timeout: 'Oh dommage, personne n\'a récupéré le drop !',
			noAuthor: 'Vous ne pouvez pas récupérer votre propre drop !',
			button: 'Récupérer !'
		}
	},
	level: {
		name: 'niveau',
		description: 'Connaître son niveau ou celui de quelqu\'un d\'autre',
		options: {
			member: {
				name: 'membre',
				description: 'De quel membre voulez-vous connaître le niveau ?'
			}
		},
		exec: {
			title: 'Informations de {username}',
			description: 'Niveau : **{level}**\n' +
				'XP Total : **{xpTotal} XP**\n' +
				'Progression du niveau : **{currentXp}/{xpToLevelUp} XP**\n' +
				'Position : **{rank}**',
			noUser: 'Aucun utilisateur n\'a été retrouvé dans la base de données !'
		}
	},
	topLevel: {
		name: 'topniveau',
		description: 'Afficher le top niveau du serveur !',
		options: {
			page: {
				name: 'page',
				description: 'Quelle page faut-il afficher ? (Optionnel)'
			},
			global: {
				name: 'global',
				description: 'Classement global ? (par défaut false)'
			}
		},
		exec: {
			simpled: {
				titleGuild: 'Top 3 du serveur !',
				titleGlobal: 'Top 3 global !',
				description: ':first_place: {mention}\n' +
					':black_medium_square: ➥ Niveau {level} ({xp} XP)\n' +
					':second_place: {mention}\n' +
					':black_medium_square: ➥ Niveau {level} ({xp} XP)\n' +
					':third_place: {mention}\n' +
					':black_medium_square: ➥ Niveau {level} ({xp} XP)',
				selfTop: '\n\n`#{position}` {mention}\n' +
					':black_medium_square: ➥ Niveau {level} ({xp} XP)'
			},
			detailed: {
				titleGuild: 'Classement du serveur page {page}',
				tileGlobal: 'Classement global page {page}',
				description: '{position}. {mention}\n' +
					'➥ Niveau {level} ({xp} XP)',
				empty: 'Aucune donnée pour cette page'
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
		description: 'Obtenez des informations à propos d\'un club !',
		options: {
			club: {
				name: 'club',
				description: 'Nom du club'
			}
		},
		exec: {
			noClub: {
				title: 'Pas de club trouvé !',
				description: 'Le club n\'a pas été trouvé, veuillez contacter Arcoz.'
			},
			apiError: {
				title: 'Une erreur d\'API est apparue',
				description: 'Une erreur d\'API est survenue. Il est possible que l\'API soit hors ligne. Réessayez la commande dans 30 minutes, et si l\'erreur se reproduit, contactez Arcoz.'
			},
			clubInfos: {
				title: 'Informations sur {clubName}',
				basic: {
					title: 'Informations basiques',
					description:
						'Type de club : __{type}__\n' +
						'Membres : {currentMembers}/{MaxMembers} membres\n' +
						'Trophées requis : {tr} 🏆\n' +
						'Accès : {access}',
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
							unknown: 'Inconnu'
						}
					}
				},
				rank: {
					title: 'Classements',
					description: 'Trophées actuels : {tr} 🏆',
					descriptionComplements: {
						bestGlobal: '\nMeilleur top mondial : {rank}',
						currentGlobal: '\nTop mondial actuel : {rank}',
						bestLocal: '\nMeilleur top FR : {rank}',
						currentLocal: '\nTop FR actuel : {rank}'
					},
					rankValue: {
						noRanked: 'Non classé',
						ranked: '{top} 🎖️'
					}
				}
			}
		}
	}
} satisfies Commands;
