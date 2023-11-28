import { Collection } from "discord.js";
import type { CooldownCollection } from "./message_create.type";

export let cooldownCollection: CooldownCollection = new Collection();


export const clearCooldown = () => {
  const now = Date.now();
  const newCooldown = cooldownCollection.filter(v => v > now);
  cooldownCollection.clear();
  cooldownCollection = newCooldown;
};