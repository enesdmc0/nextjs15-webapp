"use client"
import { atomWithStorage } from "jotai/utils";

export const activeQuestionAtom = atomWithStorage<string | null>("activeQuestion", null);
export const activeCategoryAtom = atomWithStorage<string | null>("activeCategory", null);

