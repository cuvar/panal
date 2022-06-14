<template>
  <div
    class="h-full bg-plightgreen text-pdarkgreen flex justify-center py-10 px-2 rounded-md"
    :class="[
      getRowSpanClass,
      getColSpanClass,
      getRowStartClass,
      getColStartClass,
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const WidgetContainer = defineComponent({
  props: {
    children: {
      type: String,
      default: "",
    },
    rowSpan: {
      type: Number,
      default: 1,
    },
    colSpan: {
      type: Number,
      default: 1,
    },
    rowStart: {
      type: Number,
      default: 1,
    },
    colStart: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    getRowSpanClass() {
      return `row-span-${this.rowSpan}`;
    },
    getColSpanClass() {
      return `col-span-${this.colSpan}`;
    },
    getRowStartClass() {
      return `row-start-${this.rowStart}`;
    },
    getColStartClass() {
      return `col-start-${this.colStart}`;
    },
  },
});
export default WidgetContainer;
</script>
