import { client, mainDir } from "$core/index";
import { logger } from "$core/utils/logger";
import { BaseCommand } from "$core/handlers/commands/base_command.class";
import { COMMANDS_PATHS } from "$core/handlers/commands/command_load/command_load.const";
import { existsSync, readdirSync, statSync } from "fs";
import { sep } from "path";
import type { GuildName } from "$core/config/guilds/guild.type";
import { isDev } from "$core/config/env";
import { loadCommands } from "$core/handlers/commands/command_load/command_load.util";
import type { CommandBuilt, GuildsCommandsBuild } from "$core/handlers/commands/command_load/command_load.type";
import { Collection } from "discord.js";
import { isNormalCommand, isSubCommands, serializeCommandName } from "$core/handlers/commands/command.util";
import { SubCommand } from "$core/handlers/commands/sub_command.class";
import { anyToError } from "$core/utils/error";

export const commandLoad = async() => {
  try {
    if (client.user === null) return logger.fatal("Loading command impossible, client not connected");

    const globalCommands: CommandBuilt[] = [];
    const guildsCommands: GuildsCommandsBuild = new Collection<GuildName, CommandBuilt[]>();

    // load all commands from folders
    for (const basePath of COMMANDS_PATHS) {
      const path = basePath(mainDir());
      const baseFolders = readdirSync(path);

      for (const baseFolder of baseFolders) {
        const folders = readdirSync(`${path}${sep}${baseFolder}${sep}`);

        for (const folder of folders) {
          const folderPath = `${path}${sep}${baseFolder}${sep}${folder}${sep}`;

          if (!statSync(folderPath).isDirectory()) {
            continue;
          }

          const commandFilePath = `${path}${sep}${baseFolder}${sep}${folder}${sep}${folder}.class.ts`;

          if (!existsSync(commandFilePath)) {
            logger.fatal(`no base file found for command ${folder} !`, ["full path : " + commandFilePath]);
          }

          const commandImport = await import(commandFilePath);
          const commandConstructor = commandImport.default;

          if (typeof commandConstructor !== "function") {
            logger.fatal(`no default export found for command ${folder} !`, ["full path : " + commandFilePath]);
          }

          const commandClass = new commandConstructor();

          if (typeof commandClass !== "object" || !(commandClass instanceof BaseCommand)) {
            logger.fatal(`class not extends BaseCommand for command ${folder} !`, ["full path : " + commandFilePath]);
          }

          if (!commandClass.isEnableInDev && isDev) {
            continue;
          }

          if (commandClass.guild === "all") {

            globalCommands.push(commandClass.builder);

          } else {

            const commandList = guildsCommands.get(commandClass.guild) || [];
            commandList.push(commandClass.builder);
            guildsCommands.set(commandClass.guild, commandList);

          }

          if (isNormalCommand(commandClass)) {

            client.commands.set(serializeCommandName(commandClass.builder.name, commandClass.guild), commandClass);

          } else if (isSubCommands(commandClass)) {
            const subCommands = commandClass.getSubCommands();

            for (const subCommandOrGroup of Object.values(subCommands)) {
              if (subCommandOrGroup instanceof SubCommand) {

                client.commands.set(serializeCommandName(commandClass.builder.name, commandClass.guild, subCommandOrGroup.name), subCommandOrGroup);
                continue;
              }

              for (const subCommand of Object.values(subCommandOrGroup)) {
                client.commands.set(serializeCommandName(
                  commandClass.builder.name,
                  commandClass.guild,
                  subCommand.name,
                  subCommand.groupName
                ), subCommand);
              }
            }
          } else {
            logger.fatal("unknown type of BaseCommand for command in folder " + commandFilePath);
          }
        }
      }
    }

    await loadCommands(globalCommands, guildsCommands);
  } catch (e) {
    logger.fatal(`failed to load commands, error : ${anyToError(e).message}`);
  }
};