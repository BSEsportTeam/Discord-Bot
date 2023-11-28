import type { Snowflake } from "discord-api-types/globals";
import type { XpMovementCause } from "@prisma/client";
import type { Result } from "rustic-error";
import { error, ok, resultify } from "rustic-error";
import type { XpMovementResult } from "$core/utils/xp/xp.type";
import { addXpToMember } from "$core/handlers/database/xp";
import { calculateLevel } from "$core/utils/xp/xp.util";
import { createXpMovement } from "$core/handlers/database/xp_movement/xp_movement.func";
import { logger } from "$core/utils/logger";
import { getGuildMember } from "$core/utils/discord/member/member.func";
import type { LevelUpRoleInfosEvolutionary } from "$core/config/guilds";
import { getDevGuildWithId, getGuildWithId, LevelUpRoleType } from "$core/config/guilds";
import { client } from "$core/index";
import { getMessageChannel } from "$core/utils/discord/channel/channel.func";
import { msgParams } from "$core/utils/function/string";
import { messageConfig } from "$core/config/message";
import { EmbedBuilder, time, userMention } from "discord.js";
import { isDev } from "$core/config/env";
import { sendBotLog } from "$core/utils/discord/webhook/webhook.util";
import { colors } from "$core/config/global";

export const checkXpRoles = async (userId: Snowflake, guildId: Snowflake, oldLevel: number, newLevel: number, message = true) => {

  const memberResult = await getGuildMember(userId, guildId);

  if (!memberResult.ok) {
    logger.error(`failed to get guild member for xp role with id ${userId} in guild ${guildId}, error : ${memberResult.error.message}`);
    return;
  }

  const member = memberResult.value;

  const config = isDev ? getDevGuildWithId(guildId) : getGuildWithId(guildId);

  if (config === null) {
    logger.error(`failed to find config for guild ${guildId} for send xp role message`);
    return;
  }

  const rolesToAdd: Snowflake[] = [];
  let lastRole: Snowflake | undefined;
  let newRole: LevelUpRoleInfosEvolutionary | undefined;

  for (const key of Object.keys(config.xp.levelUpRoles)) {

    const numericKey = parseInt(key, 10);
    const infos = config.xp.levelUpRoles[numericKey];

    if (numericKey > oldLevel && numericKey <= newLevel && infos.type === LevelUpRoleType.CUMULATIVE) {
      rolesToAdd.push(infos.id);
    }

    if (numericKey <= oldLevel && infos.type === LevelUpRoleType.EVOLUTIONARY) {
      lastRole = infos.id;
    }

    if (numericKey <= newLevel && infos.type === LevelUpRoleType.EVOLUTIONARY) {
      newRole = infos;
    }
  }

  if (typeof newRole !== "undefined" && lastRole !== newRole.id) {
    rolesToAdd.push(newRole.id);

    if (typeof lastRole !== "undefined") {
      const id = lastRole;
      const removeResult = await resultify(() => member.roles.remove(id, "xp system"));

      if (!removeResult.ok) {
        logger.error(`failed to remove roles to member ${userId} in guild ${guildId} for xp system, error : ${removeResult.error.message}`);
      }
    }

    if (message) {
      const guild = client.guilds.cache.get(guildId);

      if (typeof guild === "undefined") {
        logger.error(`failed to find cache for guild ${guildId} for send level up message`);
        return;
      }

      const channelResult = await getMessageChannel(guildId, config.xp.levelUpChannel, "xp roles");

      if (!channelResult.ok) {
        logger.error(channelResult.error.message);
        return;
      }

      const channel = channelResult.value;
      const msg = msgParams(messageConfig.xp.roleUp, [member.displayName, newRole.name, newRole.message]);

      const result = await resultify(() => channel.send(msg));

      if (!result.ok) {
        logger.error(`failed to send message for role up in channel ${channel.id} in guild ${guildId}, error : ${result.error.message}`);
      }
    }

  }
  if (rolesToAdd.length > 0) {
    const addResult = await resultify(() => member.roles.add(rolesToAdd[0], "xp system"));

    if (!addResult.ok) {
      logger.error(`failed to add roles to member ${userId} in guild ${guildId} for xp system, error : ${addResult.error.message}`);
    }
  }
};

const sendLevelUpMessage = async (userId: Snowflake, guildId: Snowflake, level: number) => {
  const config = isDev ? getDevGuildWithId(guildId) : getGuildWithId(guildId);

  if (config === null) {
    logger.error(`failed to find config for guild ${guildId} for send level up message`);
    return;
  }

  const channelResult = await getMessageChannel(guildId, config.xp.levelUpChannel, "xp level up message");

  if (!channelResult.ok) {
    logger.error(channelResult.error.message);
    return;
  }

  const channel = channelResult.value;

  const result = await resultify(() => channel.send(msgParams(messageConfig.xp.levelUp, [userMention(userId), level])));

  if (!result.ok) {
    logger.error(`failed to send message for level up in channel ${channel.id} in guild ${guildId}, error : ${result.error.message}`);
  }
};


export const addXp = async (
  userId: Snowflake,
  guildId: Snowflake,
  amount: number,
  cause: XpMovementCause | null = null,
  causeBy: Snowflake | "unknown" = "unknown",
  reason = ""
): Promise<Result<XpMovementResult, Error>> => {

  if (amount === 0) {
    return error(new Error("invalid amount of xp, get 0"));
  }

  const result = await addXpToMember(userId, guildId, amount);

  if (!result.ok) {
    return error(result.error);
  }

  const oldLevel = calculateLevel(result.value - amount);
  const newLevel = calculateLevel(result.value);

  if (newLevel > oldLevel && cause !== "REVERSE") {
    await sendLevelUpMessage(userId, guildId, newLevel);
    await checkXpRoles(userId, guildId, oldLevel, newLevel);
  }

  if (cause !== null) {
    const movResult = await createXpMovement({
      xpAmount: amount,
      finalXp: result.value,
      guildId,
      forUserId: userId,
      byUserId: causeBy,
      reason,
      cause: cause,
    });

    if (!movResult.ok) {
      logger.error("Failed to create XpMovement Log !", {
        ...movResult.error.debug(),
        guildId,
        forUser: userId,
        by: causeBy,
      });
    } else {
      await sendBotLog(new EmbedBuilder()
        .setTitle(messageConfig.logs.xpMovement.title)
        .setDescription(msgParams(messageConfig.logs.xpMovement.description, [
          movResult.value.id,
          movResult.value.xpAmount,
          userMention(movResult.value.byUserId),
          userMention(movResult.value.forUserId),
          movResult.value.guild.name,
          time(movResult.value.date, "F"),
          movResult.value.cause,
          movResult.value.reason,
        ]))
        .setColor(colors.bseColor4));
    }
  }

  return ok({
    xp: result.value,
    level: newLevel,
  });
};