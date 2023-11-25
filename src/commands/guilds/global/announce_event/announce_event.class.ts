import { BaseCommand } from "$core/handlers/commands/base_command.class";
import type { ChatInputCommandInteraction } from "discord.js";
import { ChannelType } from "discord.js";
import { commandsConfig } from "$core/config/message/command/commands.config";
import { isProd } from "$core/config/env";
import { devConfig } from "$core/config/guilds/_dev/dev.config";
import type { Result } from "rustic-error";
import { error, ok, resultify } from "rustic-error";
import { anyToError, CommandError } from "$core/utils/error";
import { errorEmbed } from "$core/utils/discord/embet/embet.func";
import { logger } from "$core/utils/logger/logger.func";
import { builder } from "./announce_event.builder";
import { getMessageReference } from "./announce_event.util";
import type { GuildAlias } from "$core/handlers/commands";
import { sendCommandReply } from "$core/handlers/commands";
import { guildsConfig } from "$core/config/guilds";
import { globalConfig } from "$core/config/global";
import { confirmIds, getConfirmButtons } from "$core/handlers/buttons/confirm";
import { Dev } from "$core/utils/dev";

const config = commandsConfig.announceEvent;

@Dev
export default class AnnounceEvent extends BaseCommand {

  guild: GuildAlias = "global";

  builder = builder.toJSON();

  async run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>> {
    if (!interaction.inGuild() || interaction.guild === null || interaction.channel === null) return ok(false);
    const guild = interaction.guild;

    const link = interaction.options.getString(config.options.link.name);
    if (!link) return error(new CommandError("No value in option link", interaction));

    const messageReference = getMessageReference(link);

    if (messageReference === null) {
      return sendCommandReply(interaction, {
        embeds: [errorEmbed(config.exec.invalidArgument)],
        ephemeral: true,
      }, false);
    }

    const channelId = typeof messageReference.channelId !== "undefined" ? messageReference.channelId : interaction.channelId;

    const channelResult = await resultify(() => guild.channels.fetch(channelId));
    if (!channelResult.ok) {
      return error(new CommandError("Failed to fetch channel", interaction, channelResult.error));
    }

    const channel = channelResult.value;

    if (channel === null || (channel.type !== ChannelType.GuildAnnouncement && channel.type !== ChannelType.GuildText)) {

      return sendCommandReply(interaction, {
        embeds: [errorEmbed(config.exec.invalidChannel)],
        ephemeral: true,
      }, false);

    }
    const message = await channel.messages.fetch(messageReference.messageId).catch(e => {
      logger.warning(`AnnounceEvent : Impossible to fetch message with id ${messageReference.messageId}, error : ${anyToError(e).message}`);
      return undefined;
    });

    if (typeof message === "undefined" || message.content.length < 1) {
      return sendCommandReply(interaction, {
        embeds: [errorEmbed(config.exec.invalidMessage)],
        ephemeral: true,
      }, false);

    }
    const guildConfig = isProd ? guildsConfig.global : devConfig.guilds.guildSection;

    return sendCommandReply(interaction, {
      content: message.content.replace(globalConfig.eventAnnouncementPingReplacer, `<@&${guildConfig.eventAnnouncements.roleId}>`),
      components: getConfirmButtons(confirmIds.announceEvent),
      allowedMentions: {
        parse: [],
      },
      files: message.attachments.toJSON(),
    }, false);
  }

}