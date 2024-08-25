import { atom } from "jotai";
import type { ToastType } from "../../types/types";

export const toastTextAtom = atom(""); // the text to display in the toast
export const toastTypeAtom = atom<ToastType>("info"); // the type of toast to display
