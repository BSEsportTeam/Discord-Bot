import type { Snowflake } from "discord-api-types/globals";
import type { Guild } from "discord.js";
import type { Result } from "rustic-error";
import { error, ok, resultify } from "rustic-error";
import { client } from "$core/index";

export const getGuild = async (id: Snowflake): Promise<Result<Guild, Error>> => {
  const result = await resultify(() => client.guilds.fetch(id));
  if (result.ok) return ok(result.value);
  return error(result.error);
};