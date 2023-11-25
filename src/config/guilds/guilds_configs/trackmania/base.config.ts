import type { BaseGuild } from "../../guild.type";
import { xpConfig } from "./xp.config";
import { pubMessage } from "./pub_message.config";

export const trackmaniaGuildConfig: BaseGuild = {
  name: "trackmania",
  guildId: "891729840028409857",
  eventAnnouncements: {
    channelId: "891771594115022938",
    roleId: "891776200945565716",
    enable: true,
  },
  inviteLink: "https://discord.gg/SB6ZhAmjVQ",
  xp: xpConfig,
  bumpChannel: "1006680947703423137",
  pubMessages: pubMessage,
};