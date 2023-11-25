import type {XpInfos} from "$core/config/guilds";
import {LevelUpRoleType} from "$core/config/guilds";

export const xpConfig: XpInfos = {
  enable: true,
  levelUpRoles: {
    "1": {
      name: "Mon xp",
      id: "880460850618585128",
      type: LevelUpRoleType.CUMULATIVE,
    },
    "5": {
      name: "Lionceau",
      id: "879094196714221598",
      type: LevelUpRoleType.EVOLUTIONARY,
      message: "Tu découvres la vie de lion, il est maintenant temps de grandir !",
    },
    "10": {
      name: "Apprenti Lion",
      id: "879094375899091044",
      type: LevelUpRoleType.EVOLUTIONARY,
      message: "Il faut continuer ainsi, c'est que le début de ton aventure de lion !",
    },
    "20": {
      name: "Lion Confirmé",
      id: "879094465036451870",
      type: LevelUpRoleType.EVOLUTIONARY,
      message: "Tu commences à prendre tes marques dans la meute ça fait plaisir !",
    },
    "30": {
      name: "Lion Adulte",
      id: "879094515145785454",
      type: LevelUpRoleType.EVOLUTIONARY,
      message: "Ça commence à devenir vraiment intéressant encore quelques petits efforts et tu deviendras un Lion Ancestral !",
    },
    "40": {
      name: "Lion Ancestral",
      id: "879094559467008000",
      type: LevelUpRoleType.EVOLUTIONARY,
      message: "Tu as déjà atteint le rôle de Lion Ancestral ?! Es-tu prêt à aller plus haut ?",
    },
    "50": {
      name: "Lion des Neiges",
      id: "879094606296408064",
      type: LevelUpRoleType.EVOLUTIONARY,
      message: "Félicitations tu deviens un lion très apprécié dans la hiérarchie  !",
    },
    "75": {
      name: "Lion Légendaire",
      id: "879094685170278410",
      type: LevelUpRoleType.EVOLUTIONARY,
      message: "Tu as encore évolué dans la hiérarchie, mais quand est-ce que tu vas t'arrêter ?",
    },
    "100": {
      name: "Roi Lion",
      id: "879094804183674970",
      type: LevelUpRoleType.EVOLUTIONARY,
      message: "Tu deviens le boss de tous les autres lions, celui que l'on retient à jamais même après sa mort !",
    },
  },
  boosterRole: "687621321966092312",
  xpBoostRole: "880460196370079855",
  disablesChannels: ["880453832595865680", "685857988291985421"],
  levelUpChannel: "879082386736939018",
};