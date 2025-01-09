/* eslint-disable react-hooks/rules-of-hooks */
import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
import { StoreApi, useStore } from "zustand";
import moment from "moment";

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

export const wildCardSearch = (list: any[], input: string): any[] => {
  const searchText = (item: any, level: number): any => {
    let hasMatch = false;
    let filteredItem = { ...item };

    for (let key in item) {
      if (item[key] == null) continue;

      if (Array.isArray(item[key])) {
        const filteredArray = item[key]
          .map((subItem: any) =>
            typeof subItem === "object" && subItem !== null
              ? searchText(subItem, level + 1)
              : subItem.toString().toUpperCase().includes(input.toUpperCase())
                ? subItem
                : null,
          )
          .filter(Boolean);

        if (filteredArray.length > 0) {
          filteredItem[key] = filteredArray;
          hasMatch = true;
        } else {
          delete filteredItem[key];
        }
      } else if (typeof item[key] === "object") {
        const nestedMatch = searchText(item[key], level + 1);

        if (nestedMatch) {
          filteredItem[key] = nestedMatch;
          hasMatch = true;
        } else {
          delete filteredItem[key];
        }
      } else if (item[key].toString().toUpperCase().includes(input.toUpperCase())) {
        hasMatch = true;
      }
    }

    if (hasMatch && level === 0) {
      return item;
    }

    return hasMatch ? filteredItem : null;
  };

  return list.map((value) => searchText(value, 0)).filter(Boolean);
};

export const getPagination = (
  currentPage: number,
  totalPages: number,
  pageBufferSize: number = 2,
): (number | "...")[] => {
  currentPage = Math.ceil(currentPage);
  totalPages = Math.ceil(totalPages);
  pageBufferSize = Math.ceil(pageBufferSize);

  const pages: (number | "...")[] = [];

  pages.push(1);

  if (currentPage > pageBufferSize + 2) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage - pageBufferSize);
  const end = Math.min(totalPages - 1, currentPage + pageBufferSize);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - pageBufferSize - 1) {
    pages.push("...");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};

export const sortData = <T extends Record<string | number | symbol, any>>(
  data: T[],
  sortKey: keyof T,
  sortOrder: "asc" | "desc",
): T[] => {
  return [...data].sort((a, b) => {
    let aValue: any = a[sortKey];
    let bValue: any = b[sortKey];

    const isDate = (value: any) => moment(value, moment.ISO_8601, true).isValid();
    const isNumber = (value: any) => !isNaN(parseFloat(value)) && isFinite(value);

    if (isDate(aValue) && isDate(bValue)) {
      aValue = moment(aValue).valueOf();
      bValue = moment(bValue).valueOf();
    } else if (isNumber(aValue) && isNumber(bValue)) {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
};

export const paginateData = <T>(data: T[], currentPage: number, itemsPerPage: number): T[] => {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return data.slice(start, end);
};
