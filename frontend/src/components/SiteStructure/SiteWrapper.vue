<script setup lang="ts">
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";

const title: string = "panal";
</script>

<template>
  <div
    class="w-screen min-h-screen flex flex-col justify-between bg-pdarkgreen text-pwhite"
  >
    <Navbar :title="title"></Navbar>
    <div
      class="my-10 sm:my-16 lg:my-16 mx-10 sm:mx-24 md:mx-10 lg:mx-20 xl:mx-36"
    >
      <slot />
    </div>
    <Footer :title="title"></Footer>
  </div>
</template>
