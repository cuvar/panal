<template>
  <div
    class="w-screen min-h-screen flex flex-col justify-between bg-pdarkgreen text-pwhite"
  >
    <Navbar></Navbar>
    <div class="my-10 sm:my-16 lg:my-16 mx-10 sm:mx-24 md:mx-10 lg:mx-20">
      <slot />
    </div>
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
