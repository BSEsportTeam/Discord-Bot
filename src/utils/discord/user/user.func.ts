import type {Snowflake} from "discord-api-types/globals";
import type {Result} from "rustic-error";
import {error, ok, resultify} from "rustic-error";
import {client} from "$core/index";
import type {User} from "discord.js";

export const getUser = async (id: Snowflake): Promise<Result<User, Error>> => {
  const result = await resultify(() => client.users.fetch(id, {cache: true}));
  if (result.ok) return ok(result.value);
  return error(result.error);
};