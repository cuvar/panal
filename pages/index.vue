<template>
  <NuxtLayout>
    <WidgetView :widgetData="widgetData"></WidgetView>
  </NuxtLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WidgetView from "../components/PageContent/WidgetView.vue";
import { mockWidgetData } from "../utils/mockdata/WidgetData.vue";
import { IWidgetData } from "../utils/types/WidgetData.vue";

const IndexPage = defineComponent({
  data() {
    return {
      widgetData: validateWidgetData(mockWidgetData) as IWidgetData[],
    };
  },
  components: {
    WidgetView,
  },
});
export default IndexPage;

function validateWidgetData(widgetData: IWidgetData[]): IWidgetData[] {
  const validatedWidgetData: IWidgetData[] = [];
  widgetData.forEach((widget) => {
    if (widget.rowSpan > 0 && widget.colSpan > 0) {
      validatedWidgetData.push(widget);
    }
  });
  return validatedWidgetData;
}
</script>
