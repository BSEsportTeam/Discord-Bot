import type { CommandResult } from "$core/base/command";
import { Command } from "$core/base/command";
import type { MainService } from "$core/service/main/main.service";
import { adminBuilder } from "$core/service/main/commands/admin/admin.builder";

export class AdminCommand extends Command<MainService> {

  name = "admin";

  slashBuilder = adminBuilder;

  async run(): Promise<CommandResult> {

  }

}