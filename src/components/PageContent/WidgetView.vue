<script lang="ts">
import WidgetContainer from "./WidgetContainer.vue";
import type { IWidgetData } from "../../../utils/types/WidgetData";
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { getGridColConfig } from "../../../utils/config/load";

const WidgetView = defineComponent({
  components: {
    WidgetContainer,
  },
  props: {
    widgetData: {
      type: Array as PropType<IWidgetData[]>,
      default(_rawProps: any) {
        return [];
      },
    },
  },
  computed: {
    getGridRowClass() {
      return "grid-rows-auto-4 sm:grid-rows-auto-4 md:grid-rows-auto-6 lg:grid-rows-auto-8";
    },
    getGridColClass() {
      const defaultColAmount = getGridColConfig();

      const xsClass = `grid-cols-${defaultColAmount.xs}`;
      const smClass = `sm:grid-cols-${defaultColAmount.sm}`;
      const mdClass = `md:grid-cols-${defaultColAmount.md}`;
      const lgClass = `lg:grid-cols-${defaultColAmount.lg}`;
      const xlClass = `xl:grid-cols-${defaultColAmount.xl}`;

      return `${xsClass} ${smClass} ${mdClass} ${lgClass} ${xlClass}`;
    },
  },
});

export default WidgetView;
</script>

<template>
  <div
    class="h-full max-w-screen-2xl grid gap-x-4 sm:gap-x-8 gap-y-4 sm:gap-y-8"
    :class="[getGridRowClass, getGridColClass]"
  >
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
