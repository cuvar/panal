<script setup lang="ts">
import SiteWrapper from "@/components/SiteStructure/SiteWrapper.vue";
import WidgetView from "../components/PageContent/WidgetView.vue";
import { mockWidgetData } from "../../utils/mockdata/WidgetData.vue";
import type { IWidgetData } from "../../utils/types/WidgetData.vue";
import { getCurrentDateHumanReadable } from "../../utils/datetime.vue";

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
    <!-- <WidgetView :widgetData="widgetData"></WidgetView> -->
    <div class="h-full flex flex-col items-center justify-between">
      <p class="text-center text-3xl">{{ getCurrentDateHumanReadable() }}</p>
    </div>
  </SiteWrapper>
</template>
