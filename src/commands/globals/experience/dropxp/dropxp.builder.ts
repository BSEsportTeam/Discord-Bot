import { SlashCommandBuilder } from "discord.js";
import { commandsConfig } from "$core/config/message/command";

const config = commandsConfig.dropXp;

export const builder = new SlashCommandBuilder()
  .setName(config.name)
  .setDescription(config.description)
  .setDMPermission(false)
  .setDefaultMemberPermissions(0)
  .addIntegerOption(numberOption => numberOption
    .setName(config.options.amount.name)
    .setDescription(config.options.amount.description)
    .setRequired(true)
    .setMinValue(1)
    .setMaxValue(100_000));