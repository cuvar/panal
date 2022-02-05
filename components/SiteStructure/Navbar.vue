<template>
  <div class="w-full flex">{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const Navbar = defineComponent({
  props: ["customProp"],
  data() {
    return {
      title: "Navbar" as string,
    };
  },
});
export default Navbar;
</script>
