<script setup lang="ts">
// import { defineComponent } from "vue";
import Widget from "./Widget.vue";
import type { IWidgetData } from "../../../utils/types/WidgetData.vue";
import { mockWidgetData } from "utils/mockdata/WidgetData.vue";

export interface IProps {
  widgetData: IWidgetData[];
}
const props = defineProps<IProps>();

if (!validateWidgetData(props.widgetData)) {
  console.warn(`Invalid widget data: ${JSON.stringify(props.widgetData)}`);
}

padWidgetData(props.widgetData);

function padWidgetData(widgets: IWidgetData[]) {
  //todo: how to get max col number?

  let paddedWidgetData: IWidgetData[] = [];
  const maxRow: number = widgets
    .map((a) => a.rowStart + a.rowSpan)
    .reduce((total, curr) => Math.max(total, curr), 0);
  // const maxCol: number = widgets
  //   .map((a) => a.colStart + a.colSpan)
  //   .reduce((total, curr) => Math.max(total, curr), 0);
  const maxCol: number = 8;
  const unusedCells: number[] = Array(maxRow * maxCol);

  for (let i: number = 0; i < unusedCells.length; i++) {
    unusedCells[i] = i;
  }

  let widgetPlaces: number[] = [];
  // mockWidgetData.forEach((w) => {
  //   const startIndex: number = w.rowStart;
  //   const endIndex: number = w.rowStart + w.rowSpan;

  //   for (let i: number = startIndex; i < endIndex; i++) {
  //     widgetPlaces.push(i);
  //   const startCol: number = w.colStart;
  //   const endCol: number = w.colStart + w.colSpan;

  //   for (let j: number = startCol; j < endCol; j++) {
  //     const index: number = i * maxCol + j;
  //     unusedCells[index] = -1;
  //   }
  //   }
  // });

  // todo: get max row
  return paddedWidgetData;
}

function validateWidgetData(value: IWidgetData[]) {
  // Todo: https://stackoverflow.com/questions/71103028/how-to-use-validator-in-vue-using-setup-script-typscript-and-the-composition-ap
  // Todo: https://vuejs.org/api/sfc-spec.html#language-blocks
  return value.every((widgetData: IWidgetData) => {
    return (
      0 < widgetData.rowSpan &&
      0 < widgetData.colSpan &&
      widgetData.title.length > 0
    );
  });
}

const rowClass: string =
  "sm:grid-rows-auto-4 md:grid-rows-auto-6 lg:grid-rows-auto-8"; // todo: make responsive using sm: etc
const colClass: string =
  "grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8";
</script>

<template>
  <!-- //TODO: max-w-screen-2xl sorgt für fehler in side margin -->
  <div class="h-full grid gap-x-8 gap-y-8" :class="[rowClass, colClass]">
    <Widget
      v-for="(widget, index) in widgetData"
      :key="index"
      :title="widget.title"
      :row-span="widget.rowSpan"
      :col-span="widget.colSpan"
      :row-start="widget.rowStart"
      :col-start="widget.colStart"
    ></Widget>
  </div>
</template>
