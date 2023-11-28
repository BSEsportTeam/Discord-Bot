import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import { getMessage } from "$core/utils/function/string/string.util";

export const adminBuilder = new SlashCommandBuilder()
  .setName(getMessage("main.command.admin.name"))
  .setDescription(getMessage("main.command.admin.description"))
  .setDefaultMemberPermissions(0)
  .setDMPermission(false)
  .addSubcommand(new SlashCommandSubcommandBuilder()
    .setName(getMessage("main.command.admin.sub.status.name"))
    .setDescription(getMessage("main.command.admin.sub.status.description")));