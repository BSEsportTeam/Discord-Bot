import { Service } from "$core/base/service/service.class";
import type { Client } from "$core/client";
import type { ServiceLoad } from "$core/base/service";
import { CancelButton } from "$core/base/button/util/cancel_button.class";
import type { Interaction } from "discord.js";
import { ApplicationCommandType, ComponentType, InteractionType } from "discord.js";
import { ID_SEPARATOR } from "$core/base/button/button.const";
import { mainConfig } from "$core/service/main/main.tdo";
import type { z } from "zod";

// admin commands
export class MainService extends Service implements ServiceLoad {

  name = "main";

  reloadable = false;

  schema = mainConfig;

  config: z.infer<typeof this.schema>;

  constructor(client: Client) {
    super(client);
    this.buttons.set("cancel", new CancelButton(this));

    const baseConfig = this.client.database.config.get(this.name);
    if (!baseConfig) {
      this.log.fatal({
        m: "failed to load config, not found !",
      });
      process.exit(1);
    }

    const result = this.schema.safeParse(baseConfig);
    if (!result.success) {
      this.log.fatal({
        m: "failed to load config",
        e: result.error,
      });
      process.exit(1);
    }

    this.config = result.data;
  }

  load(): void {
    this.client.on("interactionCreate", (i) => this.handleInteraction(i));
  }

  handleInteraction(interaction: Interaction): void {
    switch (interaction.type) {
      case InteractionType.ApplicationCommand: {

        const command = this.client.commandManager.getCommand(interaction.commandName);
        if (!command) {
          this.log.error({
            m: `command with name ${interaction.commandName} not found`,
          });
          return;
        }

        if (interaction.commandType !== ApplicationCommandType.ChatInput) {
          this.log.error({
            m: `command with name ${interaction.commandName} is not a slash command`,
          });
          return;
        }

        void command.preRun(interaction);

        break;
      }
      case InteractionType.MessageComponent: {
        switch (interaction.componentType) {
          case ComponentType.Button: {
            const button = this.client.buttonManager.get(interaction.customId.split(ID_SEPARATOR)[0]);
            if (!button) {
              this.log.error({
                m: `button with name ${interaction.customId} not found`,
              });
              return;
            }

            void button.preRun(interaction);
            break;
          }

          default: {
            return;
          }
        }
        break;
      }

      default: {
        return;
      }
    }
  }

}