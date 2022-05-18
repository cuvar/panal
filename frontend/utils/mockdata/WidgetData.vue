<script lang="ts">
import { getCurrentDateHumanReadable } from "../datetime.vue";
import { IWidgetData } from "../types/WidgetData.vue";
const AMOUNT_WIDGET: number = 1; //10x6
const mockWidgetData: IWidgetData[] = [...Array(AMOUNT_WIDGET).keys()].map(
  (i) => {
    return {
      rowSpan: 3,
      colSpan: 1,
      rowStart: 1,
      colStart: 3,
      order: i + 1,
      title: `${getCurrentDateHumanReadable()}`,
    };
  }
);

export { mockWidgetData };
</script>
