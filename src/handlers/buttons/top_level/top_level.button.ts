import type { ButtonHandler } from "$core/handlers/buttons";
import { buttonsDynamicIds, buttonsIds } from "$core/handlers/buttons";
import type { ButtonInteraction } from "discord.js";
import type { Result } from "rustic-error";
import type { ButtonError } from "$core/utils/error";
import { updateMessage } from "$core/handlers/buttons/top_level/top_level.util";
import type { PageTypes } from "$core/utils/xp/page/page.type";

const page: ButtonHandler = {
  id: buttonsIds.topLevel.pages,
  name: "topLevelPage",
  authorOnly: true,
  run(interaction: ButtonInteraction): Promise<Result<boolean, ButtonError>> {
    const [page, type] = buttonsDynamicIds.topLevel.deconstruct(interaction.customId);
    return updateMessage(interaction, parseInt(page), type as PageTypes);
  },

};

const detailed: ButtonHandler = {
  id: buttonsIds.topLevel.detailed,
  name: "topLevelDetailed",
  authorOnly: true,
  run(interaction: ButtonInteraction): Promise<Result<boolean, ButtonError>> {
    const [type] = buttonsDynamicIds.topLevelDetailed.deconstruct(interaction.customId);
    return updateMessage(interaction, 1, type as PageTypes);
  },
};

export default [
  page,
  detailed,
];