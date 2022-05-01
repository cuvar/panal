<script setup lang="ts">
// import { defineComponent } from "vue";
import WidgetContainer from "./WidgetContainer.vue";
import type { IWidgetData } from "../../../utils/types/WidgetData.vue";

export interface IProps {
  widgetData: IWidgetData[];
}
const props = defineProps<IProps>();

if (!validateWidgetData(props.widgetData)) {
  console.warn(`Invalid widget data: ${JSON.stringify(props.widgetData)}`);
}

function validateWidgetData(value: IWidgetData[]) {
  // Todo: https://stackoverflow.com/questions/71103028/how-to-use-validator-in-vue-using-setup-script-typscript-and-the-composition-ap
  // Todo: https://vuejs.org/api/sfc-spec.html#language-blocks
  return value.every((widgetData: IWidgetData) => {
    return (
      0 < widgetData.rowSpan &&
      0 < widgetData.colSpan &&
      0 < widgetData.order &&
      widgetData.title.length > 0
    );
  });
}

const rowClass: string = "auto-rows-min";
const colClass: string =
  "grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8";
</script>

<template>
  <!-- //TODO: max-w-screen-2xl sorgt für fehler in side margin -->
  <div class="h-full grid gap-x-8 gap-y-8" :class="[rowClass, colClass]">
    <WidgetContainer
      v-for="(widget, index) in widgetData"
      :key="index"
      :title="widget.title"
      :order="widget.order"
      :row-span="widget.rowSpan"
      :col-span="widget.colSpan"
    ></WidgetContainer>
  </div>
</template>
