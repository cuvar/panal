import type GridLayout from "react-grid-layout";
import { BREAKPOINTS_ORDER } from "~/utils/const";
import { isSameSet } from "~/utils/helper";
import { ScreenSize } from "~/utils/types/types";
import type { AdjustedWidgetConfig } from "~/utils/types/widget";

export default function updateWidgetLayoutService(
  newLayouts: GridLayout.Layouts,
  widgetConfig: AdjustedWidgetConfig[],
): AdjustedWidgetConfig[] {
  // newLayouts[i].i is the widget id --> can be used for transforming

  // validate newLayouts
  if (!newLayouts) throw new Error("newLayouts is undefined");
  if (!isSameSet(BREAKPOINTS_ORDER, Object.keys(newLayouts))) {
    throw new Error("newLayouts is not valid");
  }
  const old = structuredClone(widgetConfig);

  BREAKPOINTS_ORDER.forEach((breakpoint) => {
    if (!newLayouts[breakpoint]) throw new Error("newLayouts is not valid");
    updateForScreenSize(newLayouts, widgetConfig, breakpoint);
  });

  // console.log(old == widgetConfig);
  // console.log(old === widgetConfig);
  // console.log(widgetConfig == widgetConfig);
  // console.log(widgetConfig === widgetConfig);
  // console.log("widgetConfig", widgetConfig);

  return widgetConfig;
}

function updateForScreenSize(
  newLayouts: GridLayout.Layouts,
  widgetConfig: AdjustedWidgetConfig[],
  breakpoint: ScreenSize,
) {
  newLayouts[breakpoint]?.forEach((layout) => {
    const widget = widgetConfig.find((widget) => widget.id === layout.i);

    if (!widget) throw new Error("widget not found");

    widget.layout[breakpoint] = layout;
  });
}
/* 
  * 0. Problem
  - die gespeicherte widgetConfig hat keine ID, aber daten was das die config angeht (data property). aber auf die widgetconfig habe ich hier keinen zugriff
  - auf widgetData habe ich zugriff und ich habe die ID, aber ich habe keine Daten, was die Config angeht. 

  * 1. idee
  - der widgetConfig beim initialen speichern IDs geben. über "getwidgetconfig" kann ich mir jederzeit die config holen. dann kann ich die layouts anpassen und einfach wieder speichern. ich muss mich nicht um die `data` property kümmern. 

  Problem 1: die ID ist für den User sichtbar 
  Lösung 1: --> check im background ob keine ID zweimal vorkommt. wenn ja, dann nochmal generieren oder fehler schmeißen. Falls IDs fehlen sollten werden sie auch neu generiert. 
  ABER: das ist ein implementierungsdetail, das der User nicht sehen sollte.

  Lösung 2: bevor ich die widgetconfig zum user gebe, die IDs entfernen. dann werden sie jedes mal neu generiert.
  ABER: ist kacke, weil ich die IDs brauche, um die layouts zu transformieren. und die IDS bleiben dabei nicht stabil.

  * -> Lösung 3: in the long run soll der user den plain text eh nicht editieren können. dann kann er auch nicht die IDS ändern. deshalb ist das problem nicht so wichtig.

  probelem 2: widgetData atom wieder zu einer property machen
  Lösung: wieder zum property zurück --> ist das notwendig wegen performance?
  
  */
