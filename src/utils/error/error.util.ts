import type {DebuggableError} from './error.type';

export const isDebuggableError = (error: Error): error is DebuggableError => {
  return 'debug' in error;
};

export const anyToError = (err: unknown): Error => {
  if (err instanceof Error) return err;
  if (typeof err === 'string') return new Error(err);
  return new Error(String(err));
};