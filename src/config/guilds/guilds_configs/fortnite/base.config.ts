import type {BaseGuild} from "../../guild.type";
import {xpConfig} from "./xp.config";
import {pubMessage} from "./pub_message.config";

export const fortniteGuildConfig: BaseGuild = {
  name: "fortnite",
  guildId: "805892482336423976",
  eventAnnouncements: {
    channelId: "913214792423055410",
    roleId: "886738721381158962",
    enable: true,
  },
  inviteLink: "https://discord.gg/UHtb89ZkHh",
  xp: xpConfig,
  bumpChannel: "1006681147318747226",
  pubMessages: pubMessage,
};