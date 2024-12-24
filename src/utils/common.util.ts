/* eslint-disable react-hooks/rules-of-hooks */
import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
import { StoreApi, useStore } from "zustand";

export const twMerge = extendTailwindMerge({});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends StoreApi<object>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => useStore(store, (s) => s[k as keyof typeof s]);
  }

  return store;
};

export const nanoid = (type: "digest" | "alpha" | "mix" = "mix", length: number = 10) => {
  const characterSets = {
    digest: "1234567890",
    alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    mix: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890",
  };

  const alphabet = characterSets[type] || characterSets.mix;
  return customAlphabet(alphabet, length)();
};
