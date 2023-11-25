import type { VoiceCollection, VoiceCollectionKey, VoiceInfos } from "$core/utils/xp/voice/voice.type";
import { Collection } from "discord.js";
import type { Snowflake } from "discord-api-types/globals";

const voicesInfos: VoiceCollection = new Collection();

const serialize = (guildId: Snowflake, userId: Snowflake): VoiceCollectionKey => `${guildId}-${userId}`;

export const setVoice = (info: VoiceInfos) => voicesInfos.set(serialize(info.guildId, info.id), info);

export const getVoices = () => voicesInfos.values();

export const getVoice = (guildId: Snowflake, userId: Snowflake) => voicesInfos.get(serialize(guildId, userId));
export const removeVoice = (guildId: Snowflake, userId: Snowflake) => voicesInfos.delete(serialize(guildId, userId));