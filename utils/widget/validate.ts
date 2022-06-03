import widgetConfig from "../../widgets.config";
import {
  IWidgetConfig,
  IWidgetData,
  IWidgetPositionData,
} from "../types/WidgetData";
import { colSmall, colMedium, colLarge } from "../../panal.config";

// % 1. read config -> to obj
export default function getWidgetData(): IWidgetConfig[] {
  const validatedWidgets: IWidgetConfig[] = validateConfig(widgetConfig);
  return validatedWidgets;
}

// % 2. validate config and rearrange if necessary
function validateConfig(configData: IWidgetConfig[]): IWidgetConfig[] {
  const validatedConfig: IWidgetConfig[] = [];

  for (let i = 0; i < configData.length; i++) {
    let hasError = false;
    const currentWidget: IWidgetConfig = configData[i];

    // todo: check if config params number are positive only
    const negPosParamsArr: [string, number][] =
      negativePositionParmas(currentWidget);
    if (negPosParamsArr.length > 0) {
      hasError = true;
      throw new Error("Widget has illegal position params");
      // todo: implement
      // todo: rearrage
    }
    const outOfBoundsReturn: IOutOfBoundsReturn = outOfColBounds(currentWidget);
    if (outOfBoundsReturn.ret === true) {
      outOfBoundsReturn.offset.forEach((offset) => {
        // todo: implement
      });

      hasError = true;
      throw new Error("Widget is out of bounds");
      // todo: implement
      // todo: rearrage
    }

    for (let j: number = i + 1; j < configData.length; j++) {
      const nextWidget: IWidgetConfig = configData[i + 1];
      if (intersecting(currentWidget, nextWidget)) {
        throw new Error("Widget intersects with other widgets");
        hasError = true;
        // todo: implement
        // todo: rearrange
      }
    }

    if (hasError) {
      // todo: implement
    } else {
      validatedConfig.push(currentWidget);
    }
  }

  return validatedConfig;
}

// % 2a. check negative position params
function negativePositionParmas(widget: IWidgetConfig): [string, number][] {
  const posIssues = [];
  posIssues.push(checkNegativePositionData(widget.sm, "sm"));
  posIssues.push(checkNegativePositionData(widget.md, "md"));
  posIssues.push(checkNegativePositionData(widget.lg, "lg"));

  return posIssues;
}

function checkNegativePositionData(
  pos: IWidgetPositionData,
  prefix: string
): [string, number][] {
  const obj = [];

  for (const posItem in pos) {
    if (pos[posItem] < 0) {
      obj.push([`${prefix}-${posItem}`, pos[posItem]]);
    }
  }

  return obj;
}

interface IOutOfBoundsReturn {
  ret: boolean;
  offset: null | [string, number][];
}

// % 2b. check outOfBounds
function outOfColBounds(widget: IWidgetConfig): IOutOfBoundsReturn {
  const offsets = {
    smOffset: outOfBoundsForSize(widget.sm, colSmall),
    mdOffset: outOfBoundsForSize(widget.md, colMedium),
    lgOffset: outOfBoundsForSize(widget.lg, colLarge),
  };

  // ! is this an array of object? it needs to be an object
  const filteredOffsets = Object.entries(offsets).filter(
    (name, offset) => offset === 0
  );

  return filteredOffsets.length > 0
    ? { ret: true, offset: filteredOffsets }
    : { ret: false, offset: null };
}

// returns: offset if out of bounds
function outOfBoundsForSize(pos: IWidgetPositionData, maxCol: number): number {
  if (pos.colStart + pos.colSpan > maxCol) {
    return pos.colStart + pos.colSpan - maxCol;
  }
  // todo: can `pos.colSpan` be negative? if so, pos.colStart + pos.colSpan > 0 needs to be checked
  // if (pos.colStart < 0) {
  //   return "left";
  // }
  return 0;
}

// % 2c. check intersecting
function intersecting(w1: IWidgetConfig, w2: IWidgetConfig): boolean {
  // todo: implement
  return false;
}
