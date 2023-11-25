import type { GuildAlias, SubCommandOptions } from "$core/handlers/commands";
import { BaseCommand } from "$core/handlers/commands";
import { builder } from "./adminxp.builder";
import { Dev } from "$core/utils/dev";
import { AdminXpAdd } from "$core/commands/globals/experience/adminxp/add/add.class";
import { AdminXpRemove } from "$core/commands/globals/experience/adminxp/remove/remove.class";

@Dev
export default class AdminXp extends BaseCommand {

  builder = builder.toJSON();

  guild: GuildAlias = "all";

  getSubCommands(): SubCommandOptions {
    return {
      add: new AdminXpAdd(),
      remove: new AdminXpRemove(),
    };
  }

}