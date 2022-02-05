<template>
  <SiteWrapper contentComponent="WidgetContainer"></SiteWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SiteWrapper from "../components/SiteStructure/SiteWrapper.vue";

const IndexPage = defineComponent({
  components: {
    SiteWrapper,
  },
});
export default IndexPage;
</script>
