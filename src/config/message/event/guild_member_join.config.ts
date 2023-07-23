import type {BaseMessage} from '$core/config/message';

export const guildMemberJoinConfig = {
	welcome: [
		'🌟 Bienvenue à {mention} ! Nous sommes ravis d\'accueillir un nouveau lion sauvage parmi nous. Installe-toi confortablement et prépare-toi à explorer notre serveur discord ! 🦁🌟',
		'🎉 Hourra ! {mention} a rejoint notre fière meute ! Un rugissement de bienvenue pour ce lion sauvage plein de promesses. Faisons de cette aventure un véritable festin pour les sens ! 🎊🦁',
		'✨ Bienvenue à {mention}, notre nouvelle étoile étincelante ! En tant que lion sauvage, tu trouveras ici un lieu où rugir, discuter et t\'épanouir. Laisse briller ta lumière parmi nous ! ✨🦁',
		'🌿 Bienvenue, {mention}, dans notre jungle virtuelle ! En tant que lion sauvage, tu apportes ta force et ta grâce à notre serveur. Laisse libre cours à ta nature et explore sans limites ! 🌿🦁',
		'🔥 Bienvenue à {mention}, notre nouvel ami à crinière ! En tant que lion sauvage, tu peux exprimer ta puissance et ta sagesse parmi nous. Nous sommes impatients de découvrir tout ce que tu as à offrir ! 🔥🦁'
	]
} satisfies Record<string, BaseMessage>;