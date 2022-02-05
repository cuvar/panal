<template>
  <div class="h-full bg-plightgreen mx-10 flex justify-center">
    <p class="text-pdarkgreen my-5 font-bold">{{ title }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const IndexContent = defineComponent({
  data() {
    return {
      title: "This is the content of this page" as string,
    };
  },
});
export default IndexContent;
</script>
