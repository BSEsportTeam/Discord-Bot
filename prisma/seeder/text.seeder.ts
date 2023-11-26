import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async(): Promise<void> => {
  const texts = {
    "command.cooldown": "La commande a un cooldown, veillez patienter {seconds} secondes.",
    "command.error.title": "Erreur",
    "command.error.description": "Une erreur est survenue lors de l'exécution de la commande.",
    "command.unauthorized": "Vous n'êtes pas autorisé à exécuter cette commande.",

    "logs.ready.readyTitle": "Bot connecté !",
    "logs.ready.readyDescription": "Le bot à été lancé avec succès avec la version **{version} !**",
    "logs.xpMovement.title": "Un nouveau mouvement d'xp à été fait",
    "logs.xpMovement.description": "Id: {id} \n"
      + "nombre d'xp : {xp}\n"
      + "par : {mention1}\n"
      + "pour : {mention2}\n"
      + "dans : {guild}\n"
      + "date : {time}\n"
      + "cause : {cause}\n"
      + "raison : {raison}",

    "button.authorOnly.title": "Non autorisé",
    "button.authorOnly.description": "seul l'auteur de la commande peut utiliser ce bouton !",
    "button.confirmSystem.cancelMessage": "Annulé avec succes",
    "button.confirmSystem.confirmButton": "Valider",
    "button.confirmSystem.cancelButton": "Annuler",
    "button.error.title": "Erreur",
    "button.error.description": "Une erreur est survenue lors de l'exécution du bouton.",

    "xp.levelUp": "**Félicitations** {mention}, tu viens de passer au niveau {level} !",
    "xp.roleUp": "**Félicitations** {pseudo}, tu viens d'obtenir le rôle **{role}** ! _**{message}**_",

    "welcomes": [
      // eslint-disable-next-line max-len
      "🌟 Bienvenue à {mention} ! Nous sommes ravis d'accueillir un nouveau lion sauvage parmi nous. Installe-toi confortablement et prépare-toi à explorer notre serveur discord ! 🦁🌟",
      // eslint-disable-next-line max-len
      "🎉 Hourra ! {mention} a rejoint notre fière meute ! Un rugissement de bienvenue pour ce lion sauvage plein de promesses. Faisons de cette aventure un véritable festin pour les sens ! 🎊🦁",
      // eslint-disable-next-line max-len
      "✨ Bienvenue à {mention}, notre nouvelle étoile étincelante ! En tant que lion sauvage, tu trouveras ici un lieu où rugir, discuter et t'épanouir. Laisse briller ta lumière parmi nous ! ✨🦁",
      // eslint-disable-next-line max-len
      "🌿 Bienvenue, {mention}, dans notre jungle virtuelle ! En tant que lion sauvage, tu apportes ta force et ta grâce à notre serveur. Laisse libre cours à ta nature et explore sans limites ! 🌿🦁",
      // eslint-disable-next-line max-len
      "🔥 Bienvenue à {mention}, notre nouvel ami à crinière ! En tant que lion sauvage, tu peux exprimer ta puissance et ta sagesse parmi nous. Nous sommes impatients de découvrir tout ce que tu as à offrir ! 🔥🦁",
    ].join(";"),

    "bump.title": "Merci du bump ! 🎉",
    "bump.description": "Merci à {mention} d'avoir bump/boost le serveur ! N'hésitez pas à revenir dans 1-2h pour bumper le serveur à nouveau !\n\n"
      + "xp journaliers : **{curentXp}/{maxXp}**\n"
      + "Récompense : **{xp} XP !**",
  };

  const values = await prisma.text.findMany();

  const toAdd: { id: string; value: string }[] = [];

  for (const [id, text] of Object.entries(texts)) {
    if (!values.find((value) => value.id === id)) {
      toAdd.push({ id: id, value: text });
    }
  }

  if (toAdd.length > 0) {
    await prisma.text.createMany({
      data: toAdd,
    });
  }
};


main().then(() => {
  console.log("done");
  void prisma.$disconnect();
}).catch((e) => {
  console.error(e);
  process.exit(1);
});