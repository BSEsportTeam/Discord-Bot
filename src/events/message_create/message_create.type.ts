import type {Collection} from "discord.js";
import type {Snowflake} from "discord-api-types/globals";

export type CooldownCollectionKey = `${Snowflake}.${Snowflake}`;

export type CooldownCollection = Collection<CooldownCollectionKey, number>