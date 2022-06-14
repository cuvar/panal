<script setup lang="ts">
import SiteWrapper from "../components/SiteStructure/SiteWrapper.vue";
import WidgetView from "../components/PageContent/WidgetView.vue";
import loadDataForWidget from "../utils/widget/load";
</script>

<template>
  <SiteWrapper>
    <div class="h-full">
      <WidgetView :widgetData="loadDataForWidget()"></WidgetView>
    </div>
  </SiteWrapper>
</template>
