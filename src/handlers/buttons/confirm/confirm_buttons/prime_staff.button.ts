import type { ConfirmButtonHandler } from "$core/handlers/buttons/confirm";
import type { ButtonInteraction } from "discord.js";
import { EmbedBuilder, userMention } from "discord.js";
import type { Result } from "rustic-error";
import { error, resultify } from "rustic-error";
import { ButtonError, isDebuggableError } from "$core/utils/error";
import { getSavedPrimes } from "$core/commands/globals/other/admin/prime_staff/prime_staff.util";
import { errorEmbed, getMessageChannel, simpleEmbed } from "$core/utils/discord";
import { commandsConfig } from "$core/config/message/command";
import { sendButtonReply } from "$core/handlers/buttons";
import { DayJS } from "$core/utils/function/dayjs";
import { isDev } from "$core/config/env";
import { devConfig } from "$core/config/guilds/_dev/dev.config";
import { guildsConfig } from "$core/config/guilds";
import { client } from "$core/index";
import { logger } from "$core/utils/logger";
import { msgParams } from "$core/utils/function/string";
import { addXp } from "$core/utils/xp";
import { colors } from "$core/config/global";
import { setTimeout } from "timers/promises";

const config = commandsConfig.admin.exec.primeStaff;
export const primeStaff: ConfirmButtonHandler = {
  name: "primeStaff",
  cancel: null,
  authorOnly: true,
  preReply: true,
  confirm: async(interaction: ButtonInteraction): Promise<Result<boolean, ButtonError>> => {
    const primes = getSavedPrimes();
    if (typeof primes === "undefined") {
      return sendButtonReply(interaction, { embeds: [errorEmbed(config.noData)] }, true);
    }

    if (DayJS().diff(interaction.message.createdAt, "hour") >= 2) {
      return sendButtonReply(interaction, { embeds: [errorEmbed(config.overtime)] }, true);
    }

    const guildId = isDev ? devConfig.guilds.guildMain.guildId : guildsConfig.global.guildId;
    const channelId = isDev ? devConfig.guilds.guildMain.primeChannel : guildsConfig.global.primeChannel;
    const channelResult = await getMessageChannel(guildId, channelId, "prime staff");
    if (!channelResult.ok) {
      return error(new ButtonError("failed to get prime channel", interaction, channelResult.error));
    }

    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
      return error(new ButtonError(`guild with id ${guildId} don't found in cache !`, interaction));
    }


    const notInServer: string[] = [];
    const addXpError: string[] = [];
    let i = 0;

    for (const prime of primes) {
      await setTimeout(3000);
      const memberResult = await resultify(() => guild.members.fetch(prime.userId));
      if (!memberResult.ok) {
        logger.error(`failed to fetch member with id ${prime.userId} for prime staff, error : ${memberResult.error.message}`);
        notInServer.push(msgParams(config.final.fields.notFound.description, [
          userMention(prime.userId),
          prime.username,
          prime.userId,
        ]));
        continue;
      }

      const addResult = await addXp(prime.userId, guildId, prime.totalPrime, "PRIME", interaction.user.id, `prime for role ${prime.role} (${prime.prime} xp)`
        + (prime.associationPrime > 0 ? `and for association (${prime.associationPrime}) xp` : ""));

      if (!addResult.ok) {
        logger.error(`failed to add xp for member ${prime.userId} (${prime.username}), error : ${addResult.error}`);
        if (isDebuggableError(addResult.error)) {
          logger.debug(addResult.error.debug());
        }

        addXpError.push(msgParams(config.final.fields.addXpError.description, [
          userMention(prime.userId),
          prime.username,
          prime.userId,
        ]));
        continue;
      }

      const result = await resultify(() => channelResult.value.send({
        embeds: [
          simpleEmbed(msgParams(config.final.message.description, [
            memberResult.value.toString(),
            prime.totalPrime,
            addResult.value.level,
            addResult.value.xp,
          ]), msgParams(config.final.message.title, [memberResult.value.displayName]))],
      }));
      if (!result.ok) {
        logger.error(`failed to send prime message, error : ${result.error.message}`);
      }
      i++;

    }

    const embed = new EmbedBuilder()
      .setTitle(config.final.title)
      .setDescription(msgParams(config.final.description, [i]))
      .setColor(colors.success);

    if (notInServer.length > 0) {
      const text = notInServer.join("\n");
      embed.addFields({
        name: config.final.fields.notFound.title,
        value: text.length < 2000 ? text : config.final.fields.toMany,
      });
      if (text.length >= 2000) {
        console.error("To many notFound, member list in debugs");
        logger.debug(text);
      }
    }
    if (addXpError.length > 0) {
      const text = addXpError.join("\n");
      embed.addFields({
        name: config.final.fields.addXpError.title,
        value: text.length < 2000 ? text : config.final.fields.toMany,
      });
      if (text.length >= 2000) {
        console.error("To many errors, member list in debugs");
        logger.debug(text);
      }
    }


    return sendButtonReply(interaction, { embeds: [embed] }, true);
  },

};