<template>
  <div
    class="w-screen min-h-screen flex flex-col justify-between bg-pdarkgreen text-pwhite"
  >
    <Navbar></Navbar>
    <slot />
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "../components/SiteStructure/Navbar.vue";
import Footer from "../components/SiteStructure/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>
