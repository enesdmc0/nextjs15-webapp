"use client"
import { atomWithStorage } from "jotai/utils";

export const activeQuestionAtom = atomWithStorage<number | null>("activeQuestion", null);
export const activeCategoryAtom = atomWithStorage<string | null>("spor", null);
