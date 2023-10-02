import { atom } from "jotai";
import { ToastType } from "./types/types";

export const toastTextAtom = atom("");
export const toastTypeAtom = atom<ToastType>("info");
