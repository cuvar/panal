import { atom } from "jotai";
import type { ToastType } from "./types/types";

export const toastTextAtom = atom("");
export const toastTypeAtom = atom<ToastType>("info");
