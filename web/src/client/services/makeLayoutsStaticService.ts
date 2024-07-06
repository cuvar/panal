import { type RGLayout } from "~/lib/types/types";

/**
 * Changes the static property of all layouts to the given value
 * @param {RGLayout} layouts Given layout
 * @param {boolean} makeStatic Indicates if the widgets should be static or not
 * @returns {RGLayout} transformed layouts
 */
export default function makeLayoutsStatic(
  layouts: RGLayout,
  makeStatic: boolean,
): RGLayout {
  Object.entries(layouts).forEach(([_key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((layout) => {
        layout.static = makeStatic;
      });
    }
  });

  return layouts;
}
