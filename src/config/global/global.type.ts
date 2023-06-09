import type {HexColorString} from 'discord.js';

export type GlobalColors = 'success'|'error'|'notAllowed';
export type Colors = Record<GlobalColors, HexColorString>