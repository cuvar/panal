<script setup lang="ts">
import WidgetContainer from "./WidgetContainer.vue";
import type { IWidgetData } from "../../../utils/types/WidgetData";

export interface IProps {
  widgetData: IWidgetData[];
}

defineProps<IProps>();

const rowClass = "sm:grid-rows-auto-4 md:grid-rows-auto-6 lg:grid-rows-auto-8"; // todo: make responsive using sm: etc
const colClass = "grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8";
</script>

<template>
  <!-- //TODO: max-w-screen-2xl sorgt für fehler in side margin -->
  <div class="h-full grid gap-x-8 gap-y-8" :class="[rowClass, colClass]">
    <WidgetContainer
      v-for="(widget, index) in widgetData"
      :key="index"
      :row-span="widget.lg.rowSpan"
      :col-span="widget.lg.colSpan"
      :row-start="widget.lg.rowStart"
      :col-start="widget.lg.colStart"
      >{{ widget.children }}</WidgetContainer
    >
  </div>
</template>
