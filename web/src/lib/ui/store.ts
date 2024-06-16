import { atom } from "jotai";
import type GridLayout from "react-grid-layout";
import type { ToastType } from "../types/types";

export const toastTextAtom = atom(""); // the text to display in the toast
export const toastTypeAtom = atom<ToastType>("info"); // the type of toast to display
export const editModeAtom = atom(false); // whether the user is in edit mode
export const widgetLayoutAtom = atom<GridLayout.Layouts>({}); // the layout of the widgets
export const editedWidgetLayoutAtom = atom<GridLayout.Layouts>({}); // the layout that is currently being edited
