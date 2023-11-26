import { Service } from "$core/base/service/service.class";
import type { Client } from "$core/client";
import type { ServiceLoad } from "$core/base/service";
import { CancelButton } from "$core/base/button/util/cancel_button.class";
import type { Interaction } from "discord.js";
import { ApplicationCommandType, ComponentType, InteractionType } from "discord.js";
import { ID_SEPARATOR } from "$core/base/button/button.const";

// admin commands
export class MainService extends Service implements ServiceLoad {

  name = "main";

  reloadable = false;


  constructor(client: Client) {
    super(client);
    this.buttons.set("cancel", new CancelButton(this));
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