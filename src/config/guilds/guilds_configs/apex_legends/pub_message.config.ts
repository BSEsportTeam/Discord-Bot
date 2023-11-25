import type { PubMessagesGlobalConfig } from "$core/config/guilds";
import { simpleEmbed } from "$core/utils/discord";

export const pubMessage: PubMessagesGlobalConfig = {
  enable: true,
  channelId: "840678579271630918",
  messages: [{
    embed: simpleEmbed("**BSE a besoin de ton aide pour que l'on puisse lancer de nouveaux projets !** :trophy: \n"
      + "\n"
      + "__Tu peux nous soutenir de 2 manières:__\n"
      + "\n"
      + ":arrow_right: En faisant un don pour notre Association : https://www.paypal.com/paypalme/CagnotteBSE\n"
      + "\n"
      + ":arrow_right: En nous suivant sur nos réseaux sociaux : https://linktr.ee/bsesport\n"
      + "\n"
      + "***On vous remercie par avance pour le soutien que vous nous apporterez !*** :pray:",
      "**__VIENS NOUS SOUTENIR__** :lion_face::heart:")
      .setImage("https://i.imgur.com/CMJ58nn.jpg"),
    buttonsLinks: {
      "Reseaux": "https://linktr.ee/bsesport",
    },
  },

    {
      embed: simpleEmbed("Tu souhaites t'investir dans le domaine du gaming et de l'eSport avec tout cela en prime dans une structure pleine d'ambitions ! 🦁\n"
        + "\n"
        + "Tu es au bon endroit ! Tu souhaiterais être bénévole dans notre structure afin de monter divers projets ? 🎮\n"
        + "\n"
        + "**Rejoins nous en ouvrant un ticket dans le salon** <#905138076295245834> :briefcase:",
        "***__Recrutement__***")
        .setImage("https://i.imgur.com/CMJ58nn.jpg"),
    }],
};