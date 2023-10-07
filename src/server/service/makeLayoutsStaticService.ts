import type GridLayout from "react-grid-layout";

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
