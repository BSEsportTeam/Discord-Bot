export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type MaybePromise<T> = T|Promise<T>;

export type MaybeOmit<T, K extends keyof T> = T|Omit<T, K>