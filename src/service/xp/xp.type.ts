import type { XpMovementCause } from "@prisma/client";

export type AddXpOptions = {
  amount: number;
  userId: string;
  guildId: string;
  reason: string;
  cause: XpMovementCause | null;
  causeId: string | null;
}


export type XpAddResponse = {
  newLevel: number;
  newXp: number;
}