<template>
  <!-- //TODO: max-w-screen-2xl sorgt für fehler in side margin -->
  <div class="h-full grid gap-x-8 gap-y-8" :class="[getRowClass, getColClass]">
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

<script lang="ts">
import { defineComponent } from "vue";
import WidgetContainer from "./WidgetContainer.vue";
import type { IWidgetData } from "../../../utils/types/WidgetData.vue";

const WidgetView = defineComponent({
  components: {
    WidgetContainer,
  },
  props: {
    widgetData: {
      type: Array as () => IWidgetData[],
      required: true,
      validator(value: IWidgetData[]) {
        return value.every((widgetData: IWidgetData) => {
          return (
            0 < widgetData.rowSpan &&
            0 < widgetData.colSpan &&
            0 < widgetData.order &&
            widgetData.title.length > 0
          );
        });
      },
    },
  },
  computed: {
    getRowClass() {
      return "auto-rows-min";
    },
    getColClass() {
      return "grid-cols-3 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-8";
    },
  },
});
export default WidgetView;
</script>
