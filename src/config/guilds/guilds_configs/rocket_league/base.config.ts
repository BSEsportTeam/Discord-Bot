import type {BaseGuild} from '../../guild.type';
import {xpConfig} from './xp.config';
import {pubMessage} from './pub_message.config';

export const rocketLeagueGuildConfig: BaseGuild = {
  name: 'rocketLeague',
  guildId: '783421034455105556',
  eventAnnouncements: {
    channelId: '834540080995237888',
    roleId: '815254897200463872',
    enable: true,
  },
  inviteLink: 'https://discord.gg/ADPKAzt5hz',
  xp: xpConfig,
  bumpChannel: '1006680512041058405',
  pubMessages: pubMessage,
};