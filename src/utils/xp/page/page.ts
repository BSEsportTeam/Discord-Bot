import type {PageInfos} from "$core/utils/xp/page/page.type";
import {PageTypes} from "$core/utils/xp/page/page.type";
import type {GlobalXPTop, GuildXPTop} from "$core/handlers/database/xp";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle, userMention} from "discord.js";
import {simpleEmbed} from "$core/utils/discord";
import {commandsConfig} from "$core/config/message/command";
import {msgParams} from "$core/utils/function/string";
import {calculateLevel} from "$core/utils/xp";
import {buttonsDynamicIds} from "$core/handlers/buttons";

export const generatePage = (page: number, data: GuildXPTop[] | GlobalXPTop[], type: PageTypes): PageInfos => {
  const config = commandsConfig.topLevel.exec.detailed;
  const buttonConfig = commandsConfig.topLevel.other.buttons;

  let description = "";
  for (let i = 0; i < data.length && i < 10; i++) {
    const info = data[i];
    description = `${description}\n${msgParams(config.description, [info.position, userMention(info.id), calculateLevel(info.xp), info.xp])}`;
  }
  if (description === "") {
    description = config.empty;
  }
  const embed = simpleEmbed(description, msgParams(
    type === PageTypes.GLOBAL ? config.tileGlobal : config.titleGuild,
    [page]
  ));

  const nextButton = new ButtonBuilder()
    .setLabel(buttonConfig.next)
    .setStyle(ButtonStyle.Primary)
    .setCustomId(buttonsDynamicIds.topLevel.construct(`${page + 1}`, type))
    .setDisabled(data.length < 11);
  const beforeButton = new ButtonBuilder()
    .setLabel(buttonConfig.before)
    .setStyle(ButtonStyle.Primary)
    .setCustomId(buttonsDynamicIds.topLevel.construct(`${page - 1}`, type))
    .setDisabled(page === 1);

  const actionRow = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(beforeButton, nextButton);
  return {
    embeds: [embed],
    components: [actionRow],
  };
};