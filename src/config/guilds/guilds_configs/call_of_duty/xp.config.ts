import type { XpInfos } from "$core/config/guilds";
import { LevelUpRoleType } from "$core/config/guilds";

export const xpConfig: XpInfos = {
  enable: true,
  levelUpRoles: {
    "1": {
      name: "Mon xp",
      id: "913593833017716766",
      type: LevelUpRoleType.CUMULATIVE,
    },
    "5": {
      name: "Lionceau",
      id: "913594901327937566",
      type: LevelUpRoleType.EVOLUTIONARY,
      message: "Tu découvres la vie de lion, il est maintenant temps de grandir !",
    },
    "10": {
      name: "Apprenti Lion",
      id: "913594849700249641",
      type: LevelUpRoleType.EVOLUTIONARY,
      message: "Il faut continuer ainsi, c'est que le début de ton aventure de lion !",
    },
    "20": {
      name: "Lion Confirmé",
      id: "913594786102001695",
      type: LevelUpRoleType.EVOLUTIONARY,
      message: "Tu commences à prendre tes marques dans la meute ça fait plaisir !",
    },
    "30": {
      name: "Lion Adulte",
      id: "913594724689006672",
      type: LevelUpRoleType.EVOLUTIONARY,
      message: "Ça commence à devenir vraiment intéressant encore quelques petits efforts et tu deviendras un Lion Ancestral !",
    },
    "40": {
      name: "Lion Ancestral",
      id: "913594565561294910",
      type: LevelUpRoleType.EVOLUTIONARY,
      message: "Tu as déjà atteint le rôle de Lion Ancestral ?! Es-tu prêt à aller plus haut ?",
    },
    "50": {
      name: "Lion des Neiges",
      id: "913594438633291847",
      type: LevelUpRoleType.EVOLUTIONARY,
      message: "Félicitations tu deviens un lion très apprécié dans la hiérarchie  !",
    },
    "75": {
      name: "Lion Légendaire",
      id: "913594384954576906",
      type: LevelUpRoleType.EVOLUTIONARY,
      message: "Tu as encore évolué dans la hiérarchie, mais quand est-ce que tu vas t'arrêter ?",
    },
    "100": {
      name: "Roi Lion",
      id: "913594320693641226",
      type: LevelUpRoleType.EVOLUTIONARY,
      message: "Tu deviens le boss de tous les autres lions, celui que l'on retient à jamais même après sa mort !",
    },
  },
  boosterRole: "909541530648322149",
  xpBoostRole: "913594045572464641",
  disablesChannels: ["913609631601946624"],
  levelUpChannel: "913586840836120616",
};