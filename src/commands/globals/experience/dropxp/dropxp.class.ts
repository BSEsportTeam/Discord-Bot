import type { CommandPreReply, GuildAlias } from "$core/handlers/commands";
import { BaseCommand, sendCommandReply } from "$core/handlers/commands";
import { builder } from "$core/commands/globals/experience/dropxp/dropxp.builder";
import type { Result } from "rustic-error";
import { error, ok, resultify } from "rustic-error";
import type { ChatInputCommandInteraction } from "discord.js";
import { CommandError } from "$core/utils/error";
import { commandsConfig } from "$core/config/message/command";
import { simpleEmbed } from "$core/utils/discord/embet/embet.func";
import { msgParams } from "$core/utils/function/string";
import { endDrop, getButtons } from "$core/commands/globals/experience/dropxp/dropxp.util";
import { Dev } from "$core/utils/dev";
import { buttonsDynamicIds } from "$core/handlers/buttons";

const config = commandsConfig.dropXp;

@Dev
export default class DropXp extends BaseCommand {

  guild: GuildAlias = "all";

  builder = builder.toJSON();

  preReply: CommandPreReply = {
    ephemeral: true,
    enable: true,
  };

  async run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>> {
    if (!interaction.inGuild() || interaction.guild === null || interaction.channel === null) return ok(false);

    const xp = interaction.options.getInteger(config.options.amount.name);
    if (xp === null) return error(new CommandError("No value in option xp", interaction));

    const buttons = getButtons(buttonsDynamicIds.dropXp.construct(interaction.user.id, String(xp)));

    const embed = simpleEmbed(msgParams(config.exec.drop.description, [xp]), config.exec.drop.title);
    const channel = interaction.channel;

    const messageResult = await resultify(() => channel.send({
      embeds: [embed],
      components: [buttons],
    }));

    if (!messageResult.ok) {
      return error(new CommandError(`failed to send drop message, error : ${messageResult.error.message}`, interaction, messageResult.error));
    }
    void endDrop(messageResult.value);

    return sendCommandReply(interaction, {
      embeds: [simpleEmbed(config.exec.success)],
      ephemeral: true,
    }, true);
  }

}