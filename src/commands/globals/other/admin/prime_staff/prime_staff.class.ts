import { SubCommand } from "$core/handlers/commands";
import { commandsConfig } from "$core/config/message/command";
import type { Result } from "rustic-error";
import { error, ok, resultify } from "rustic-error";
import { CommandError } from "$core/utils/error";
import type { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { userMention } from "discord.js";
import { ownerOnly } from "$core/commands/globals/other/admin/admin.util";
import { getPrimes } from "$core/commands/globals/other/admin/prime_staff/prime_staff.util";
import { errorEmbed, simpleEmbed } from "$core/utils/discord";
import { msgParams } from "$core/utils/function/string";
import { confirmIds, getConfirmButtons } from "$core/handlers/buttons/confirm";

const config = commandsConfig.admin.exec.primeStaff;

export class PrimeStaff extends SubCommand {

  name = commandsConfig.admin.subcmds.primeStaff.name;

  preReply = {
    enable: true,
    ephemeral: false,
  };

  async run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>> {
    const ownerOnlyResult = await ownerOnly(interaction);
    if (!ownerOnlyResult.ok) {
      return error(ownerOnlyResult.error);
    }
    if (ownerOnlyResult.value) {
      return ok(false);
    }

    const primeResult = await getPrimes();
    if (!primeResult.ok) {
      return error(new CommandError("failed to get staff primes", interaction, primeResult.error));
    }

    if (typeof primeResult.value === "string") {
      return this.sendReply(interaction, {embeds: [errorEmbed(primeResult.value)]});
    }

    const infos: string[] = [];
    for (const prime of primeResult.value) {
      infos.push(msgParams(config.primeInfo, [
        userMention(prime.userId),
        prime.role,
        prime.username,
        prime.totalPrime,
        prime.prime,
        prime.associationPrime,
      ]));
    }

    const embeds: EmbedBuilder[] = [];


    // thx https://stackoverflow.com/a/8495740
    const chunkSize = 30;
    for (let i = 0; i < infos.length; i += chunkSize) {
      const chunk = infos.slice(i, i + chunkSize);
      embeds.push(simpleEmbed(chunk.join("\n")));
    }

    const replyResult = await this.sendReply(interaction, {
      embeds: [embeds[0].setTitle(config.primeInfoTitle)],
    });
    if (!replyResult.ok) {
      return error(replyResult.error);
    }

    for (const embed of embeds.slice(1)) {
      const result = await resultify(() => interaction.followUp({
        embeds: [embed],
      }));
      if (!result.ok) {
        return error(new CommandError("failed to followUp interaction", interaction, result.error));
      }
    }

    const result = await resultify(() => interaction.followUp({
      embeds: [simpleEmbed(config.primeDescription)],
      components: getConfirmButtons(confirmIds.primeStaff),
    }));
    if (!result.ok) {
      return error(new CommandError("failed to followUp interaction", interaction, result.error));
    }
    return ok(true);

  }

}