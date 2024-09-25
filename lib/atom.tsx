"use client";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const activeQuestionAtom = atomWithStorage<number | null>(
  "activeQuestion",
  null
);
export const activeCategoryAtom = atomWithStorage<string | null>(
  "activeCategory",
  null
);

export const navbarOpenAtom = atom<boolean>(false);
