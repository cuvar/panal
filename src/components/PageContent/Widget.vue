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
    {{ title }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const rowClasses: string[] = [
  "row-span-1",
  "row-span-2",
  "row-span-3",
  "row-span-4",
  "row-span-5",
  "row-span-6",
  "row-span-7",
  "row-span-8",
  "row-span-9",
  "row-span-10",
  "row-span-11",
  "row-span-12",
];
const colClasses: string[] = [
  "col-span-1",
  "col-span-2",
  "col-span-3",
  "col-span-4",
  "col-span-5",
  "col-span-6",
  "col-span-7",
  "col-span-8",
  "col-span-9",
  "col-span-10",
  "col-span-11",
  "col-span-12",
];
const rowStartClasses: string[] = [
  "row-start-1",
  "row-start-2",
  "row-start-3",
  "row-start-4",
  "row-start-5",
  "row-start-6",
  "row-start-7",
  "row-start-8",
  "row-start-9",
  "row-start-10",
  "row-start-11",
  "row-start-12",
  "row-start-13",
];
const colStartClasses: string[] = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
  "col-start-8",
  "col-start-9",
  "col-start-10",
  "col-start-11",
  "col-start-12",
  "col-start-13",
];

const WidgetContainer = defineComponent({
  props: {
    title: {
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
      return rowClasses[this.rowSpan - 1];
    },
    getColSpanClass() {
      return colClasses[this.colSpan - 1];
    },
    getRowStartClass() {
      return rowStartClasses[this.rowStart - 1];
    },
    getColStartClass() {
      return colStartClasses[this.colStart - 1];
    },
  },
});
export default WidgetContainer;
</script>
