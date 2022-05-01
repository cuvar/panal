<script lang="ts">
import { IWidgetData } from "../types/WidgetData.vue";
const AMOUNT_WIDGET: number = 60; //10x6
const mockWidgetData: IWidgetData[] = [...Array(AMOUNT_WIDGET).keys()].map(
  (i) => {
    return {
      rowSpan: 1,
      colSpan: 1,
      order: i + 1,
      title: `Widget ${i + 1}`,
    };
  }
);

export { mockWidgetData };
</script>
