<template>
  <div class="w-full flex justify-center py-10 shadow-md">
    <p>{{ title }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const Navbar = defineComponent({
  props: ["customProp"],
  data() {
    return {
      title: "panal" as string,
    };
  },
});
export default Navbar;
</script>
