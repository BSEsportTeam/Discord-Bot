import type {BaseGuild, BrawlStarsGuild, GlobalGuild} from "$core/config/guilds/guild.type";
import {LevelUpRoleType} from "$core/config/guilds/guild.type";
import type {Overwrite} from "$core/utils/type/type";
import type {GuildAlias} from "$core/handlers/commands";
import {EmbedBuilder} from "discord.js";

const devGuilds = {
  guildMain: {
    name: "all",
    guildId: "1096122857207111852",
    eventAnnouncements: {
      channelId: "1096131124109000824",
      roleId: "1096122857282621468",
      enable: true,
    },
    inviteLink: "https://discord.gg/s5qWJku7HG",
    xp: {
      enable: true,
      levelUpRoles: {},
      boosterRole: "",
      xpBoostRole: "1096122857244852269",
      disablesChannels: ["1096122870121386166"],
      levelUpChannel: "1096122869626437705",
    },
    bumpChannel: "1096122869626437706",
    pubMessages: {
      enable: true,
      channelId: "1096122863368556717",
      messages: [
        {
          embed: new EmbedBuilder()
            .setDescription("test"),
          buttonsLinks: {
            "Photos de Nicolas": "https://youtu.be/dQw4w9WgXcQ",
          },
        },
      ],
    },
    primeChannel: "1096122859178426423",
  },
  guildSection: {
    name: "global",
    guildId: "1096123374092161024",
    eventAnnouncements: {
      channelId: "1096123377611178009",
      roleId: "1096123374234763313",
      enable: true,
    },
    inviteLink: "https://discord.gg/wtFaNTsesA",
    xp: {
      enable: true,
      levelUpRoles: {
        "1": {
          name: "mon xp",
          id: "1096123374129905797",
          type: LevelUpRoleType.CUMULATIVE,
        },
        "2": {
          name: "lionceau",
          id: "1096123374092161027",
          type: LevelUpRoleType.EVOLUTIONARY,
          message: "Tu découvres la vie de lion, il est maintenant temps de grandir ! 👀 ",
        },
        "3": {
          name: "apprenti lion",
          id: "1096123374092161028",
          type: LevelUpRoleType.EVOLUTIONARY,
          message: "Il faut continuer ainsi, c'est que le début de ton aventure de lion !",
        },
      },
      boosterRole: "",
      xpBoostRole: "1096123374129905796",
      disablesChannels: [],
      levelUpChannel: "1096123377984475188",
    },
    autoPing: {
      roles: {
        pro: "1096123374306070622",
        staff: "1096123374306070628",
      },
      channel: "1096123376965263394",
    },
    clubs: [],
    bumpChannel: "1096123377984475189",
    pubMessages: {
      enable: true,
      channelId: "1096123376340308014",
      messages: [
        {
          embed: new EmbedBuilder()
            .setDescription("test"),
          buttonsLinks: {
            "Photos de Nicolas": "https://youtu.be/dQw4w9WgXcQ",
          },
        },
      ],
    },
  },
} satisfies Record<"guildMain" | "guildSection", Overwrite<BrawlStarsGuild & GlobalGuild, {
  name: GuildAlias;
}> | Overwrite<BaseGuild, { name: GuildAlias }>>;

export const devConfig = {
  guilds: devGuilds,
};