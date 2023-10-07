import { generateUniqueID } from "~/utils/helper";
import { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";
import type { UserWidgetConfig } from "../entities/userWidgetConfig";
import addMissingLayouts from "./addMissingLayoutsService";
import adjustLayoutValues from "./adjustLayoutValuesService";

export default function transformWidgetConfig(
  userWidgetConfig: UserWidgetConfig[],
) {
  const adjustedWidgetConfig = userWidgetConfig.map((widget) => {
    const withMissingLayouts = addMissingLayouts(widget.layout);
    const adjustedConfig = new AdjustedWidgetConfig(
      generateUniqueID(),
      widget.type,
      withMissingLayouts,
      widget.data,
    );
    return adjustLayoutValues<AdjustedWidgetConfig>(adjustedConfig);
  });

  return adjustedWidgetConfig;
}
