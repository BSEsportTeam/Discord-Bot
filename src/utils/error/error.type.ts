import type { DebugValues } from "$core/utils/logger/";

export type DebuggableError = {
  debug: () => DebugValues;
} & Error

export type ResultOk<T> = [true, T]
export type ResultError<E extends Error> = [false, E]
export type Result<T, E extends Error> = ResultOk<T> | ResultError<E>