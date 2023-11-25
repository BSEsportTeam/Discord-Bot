import type {HexColorString} from 'discord.js';

export type GlobalColors = 'success' | 'error' | 'notAllowed' | `bseColor${'1' | '2' | '3' | '4' | '5'}`;
export type Colors = Record<GlobalColors, HexColorString>