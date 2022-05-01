<template>
  <div
    class="h-full bg-plightgreen text-pdarkgreen flex justify-center py-10 px-2"
    :class="[getRowSpanClass, getColSpanClass, getOrderClass]"
  >
    {{ title }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const orderClasses: string[] = [
  "order-1",
  "order-2",
  "order-3",
  "order-4",
  "order-5",
  "order-6",
  "order-7",
  "order-8",
  "order-9",
  "order-10",
  "order-11",
  "order-12",
];
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
    order: {
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
    getOrderClass() {
      return orderClasses[this.order - 1];
    },
  },
});
export default WidgetContainer;
</script>
