"use client";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import useWindowWidth from "./use-window";

export const activeQuestionAtom = atomWithStorage<number | null>(
  "activeQuestion",
  null
);
export const activeCategoryAtom = atomWithStorage<string | null>(
  "activeCategory",
  null
);

export const navbarOpenAtom = atom<boolean>(true);
export const aAtom = atom<boolean>(true);
export const bAtom = atom<boolean>(true);
