<template>
  <div class="w-full flex justify-center">
    <p>{{ title }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const Footer = defineComponent({
  data() {
    return {
      title: "panal" as string,
    };
  },
});
export default Footer;
</script>
