import type { CommandPreReply } from "$core/handlers/commands";
import { sendCommandReply, SubCommand } from "$core/handlers/commands";
import { CommandError } from "$core/utils/error";
import type { Result } from "rustic-error";
import { error, ok } from "rustic-error";
import type { ChatInputCommandInteraction } from "discord.js";
import { addXp } from "$core/utils/xp";
import { XpMovementCause } from "@prisma/client";
import { msgParams } from "$core/utils/function/string";
import { commandsConfig } from "$core/config/message/command";
import { simpleEmbed } from "$core/utils/discord/embet/embet.func";

const config = commandsConfig.adminXp;

export class AdminXpRemove extends SubCommand {

  preReply: CommandPreReply = {
    ephemeral: false,
    enable: true,
  };

  name = config.subcmds.remove.name;

  async run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>> {
    if (!interaction.inGuild() || interaction.guild === null || interaction.channel === null) return ok(false);

    const xp = interaction.options.getInteger(config.subcmds.remove.options.xp.name);
    if (!xp) {
      return error(new CommandError("No value in option xp", interaction));
    }

    const user = interaction.options.getUser(config.subcmds.remove.options.member.name);
    if (!user) {
      return error(new CommandError("No value in option user", interaction));
    }

    const reason = interaction.options.getString(config.subcmds.remove.options.reason.name) || "unknown";

    const xpResult = await addXp(user.id, interaction.guildId, -Math.abs(xp), XpMovementCause.ADMINXP, interaction.user.id, reason);
    if (!xpResult.ok || xpResult.value === null) {
      return error(new CommandError(`failed to add xp to user ${user.username}( ${user.id})`, interaction, xpResult.ok ? undefined : xpResult.error));
    }

    const embed = simpleEmbed(
      msgParams(config.exec.remove.succes.description, [xp, user.toString(), xpResult.value.level, xpResult.value.xp])
      + (reason !== "unknown" ? msgParams(config.exec.remove.succes.reason, [reason]) : "")
    ).setAuthor({
      name: config.exec.remove.succes.title,
      iconURL: interaction.guild.iconURL() || undefined,
    });

    return sendCommandReply(interaction, {
      embeds: [embed],
    }, true);
  }

}