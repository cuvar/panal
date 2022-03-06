<script setup lang="ts">
import SiteWrapper from "@/components/SiteStructure/SiteWrapper.vue";
import WidgetView from "../components/PageContent/WidgetView.vue";
import { mockWidgetData } from "../../utils/mockdata/WidgetData.vue";
import type { IWidgetData } from "../../utils/types/WidgetData.vue";

const widgetData: IWidgetData[] = validateWidgetData(mockWidgetData);

function validateWidgetData(widgetData: IWidgetData[]): IWidgetData[] {
  const validatedWidgetData: IWidgetData[] = [];
  widgetData.forEach((widget) => {
    if (widget.rowSpan > 0 && widget.colSpan > 0) {
      validatedWidgetData.push(widget);
    }
  });
  return validatedWidgetData;
}
</script>

<template>
  <SiteWrapper>
    <WidgetView :widgetData="widgetData"></WidgetView>
  </SiteWrapper>
</template>
