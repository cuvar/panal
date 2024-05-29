import type GridLayout from "react-grid-layout";

/**
 * Changes the static property of all layouts to the given value
 * @param {GridLayout.Layouts} layouts Given layout
 * @param {boolean} makeStatic Indicates if the widgets should be static or not
 * @returns {GridLayout.Layouts} transformed layouts
 */
export default function makeLayoutsStatic(
  layouts: GridLayout.Layouts,
  makeStatic: boolean,
): GridLayout.Layouts {
  Object.entries(layouts).forEach(([_key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((layout) => {
        layout.static = makeStatic;
      });
    }
  });

  return layouts;
}
