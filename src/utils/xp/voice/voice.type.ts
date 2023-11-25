import type { Snowflake } from "discord-api-types/globals";
import type { Collection } from "discord.js";

export type VoiceInfos = {
  start: number;
  id: Snowflake;
  guildId: Snowflake;
  deaf: boolean;
  mute: boolean;
  lastUpdate: number;
  channelId: Snowflake;
  lastXpGive?: number;
}

export type VoiceCollectionKey = `${Snowflake}-${Snowflake}`;
export type VoiceCollection = Collection<VoiceCollectionKey, VoiceInfos>