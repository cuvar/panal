import { atom } from "jotai";
import type GridLayout from "react-grid-layout";
import type { ToastType } from "./types/types";

export const toastTextAtom = atom("");
export const toastTypeAtom = atom<ToastType>("info");
export const editModeAtom = atom(false);
export const widgetLayoutAtom = atom<GridLayout.Layouts>({});
export const editedWidgetLayoutAtom = atom<GridLayout.Layouts>({});
export const showHiddenWidgetsAtom = atom(false);
