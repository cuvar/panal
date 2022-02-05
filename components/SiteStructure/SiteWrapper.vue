<template>
  <div
    class="w-screen min-h-screen flex flex-col justify-between bg-pdarkgreen text-pwhite"
  >
    <Navbar></Navbar>
    <component :is="contentComponent"></component>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
import IndexContent from "../PageContent/WidgetContainer.vue";

const SiteWrapper = defineComponent({
  components: {
    Navbar,
    Footer,
    IndexContent,
  },
  data() {
    return {};
  },
  props: ["contentComponent"],
  // computed: {
  // currentContentComponent() {
  //   return "Footer";
  // },
  // },
});
export default SiteWrapper;
</script>
