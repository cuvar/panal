import { atom, useAtom } from "jotai";
export const seshAtom = atom(false);

const authorizeSeshAtom = atom(
  (get) => get(seshAtom),
  (get, set, auth: boolean) => {
    set(seshAtom, auth);
  }
);
