import { type WidgetType } from "~/server/domain/config/widgetType";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { type RGLayout } from "~/server/domain/layout/layout";

export type WidgetProps = {
  widget: AdjustedWidgetLayout;
};

export type DisplayedWidgets = {
  rgLayout: RGLayout;
  awLayout: AdjustedWidgetLayout[];
};

export type LayoutType = {
  id: string;
  type: WidgetType;
};
