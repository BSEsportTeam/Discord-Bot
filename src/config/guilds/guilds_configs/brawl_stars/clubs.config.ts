import type {BrawlStarsClub} from "$core/config/guilds";
import {BrawlStarsClubType} from "$core/config/guilds/guild.type";

export const clubsList: BrawlStarsClub[] = [
  {
    name: "BS Immortals",
    tag: "UJCQVJV",
    type: BrawlStarsClubType.LADDER,
    globalTop: true,
    localTop: true,
    bestGlobal: 15,
    bestLocal: 1,
  },
  {
    name: "BS Prestige",
    tag: "JV820R8P",
    type: BrawlStarsClubType.LADDER,
    globalTop: false,
    localTop: true,
    bestLocal: 93,
  },
  {
    name: "BS Kings",
    tag: "8LPCQRGV",
    type: BrawlStarsClubType.LADDER,
  },
  {
    name: "BS Assembly",
    tag: "UUQGLR9P",
    type: BrawlStarsClubType.LADDER,
  },
  {
    name: "BS Esport",
    tag: "9UGGORJ",
    type: BrawlStarsClubType.LADDER,
  },
  {
    name: "BS Legends",
    tag: "JYOL9YG8",
    type: BrawlStarsClubType.LADDER,
  },
  {
    name: "BS Myths",
    tag: "8QUVJ8YC",
    type: BrawlStarsClubType.LADDER,
  },
  {
    name: "BS Esport Pro",
    tag: "9Y9UCUP",
    type: BrawlStarsClubType.LADDER,
    globalTop: false,
    localTop: true,
    bestLocal: 13,
  },
  {
    name: "BS Aries",
    tag: "2PQ9RC8UL",
    type: BrawlStarsClubType.LADDER,
  },
  {
    name: "BS Esport Elite",
    tag: "QCJUVQV",
    type: BrawlStarsClubType.LADDER,
  },
  {
    name: "BS Demons",
    tag: "2GPQGL8JY",
    type: BrawlStarsClubType.LADDER,
  },
  {
    name: "BS Angels",
    tag: "89J2Y8QQ",
    type: BrawlStarsClubType.CHILL,
  },
  {
    name: "BS Shadows",
    tag: "2PY8C9VPJ",
    type: BrawlStarsClubType.CHILL,
  }, {
    name: "BS Heroes",
    tag: "2GPRCPL02",
    type: BrawlStarsClubType.CHILL,
  },
  {
    name: "BS Olympus",
    tag: "CG2YLR90",
    type: BrawlStarsClubType.CHILL,
  },
  {
    name: "BS Warriors",
    tag: "8YLCOY2Q",
    type: BrawlStarsClubType.CHILL,
  },
  {
    name: "BS Brotherhood",
    tag: "209J8CC2Y",
    type: BrawlStarsClubType.LADDER,
  },
];