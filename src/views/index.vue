<script setup lang="ts">
import SiteWrapper from "@/components/SiteStructure/SiteWrapper.vue";
import WidgetView from "../components/PageContent/WidgetView.vue";
import { mockWidgetData } from "../../utils/mockdata/WidgetData";
</script>

<template>
  <SiteWrapper>
    <div class="h-full">
      <WidgetView :widgetData="mockWidgetData"></WidgetView>
    </div>
  </SiteWrapper>
</template>
