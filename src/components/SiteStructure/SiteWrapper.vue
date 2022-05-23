<script setup lang="ts">
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";

const title: string = "panal";
const website: string = "cuvar.dev";
</script>

<template>
  <div class="w-screen min-h-screen flex flex-col bg-pdarkgreen text-pwhite">
    <Navbar :title="title"></Navbar>
    <div
      class="my-10 sm:my-16 lg:my-16 mx-10 sm:mx-24 md:mx-10 lg:mx-20 xl:mx-36 flex flex-col flex-auto"
    >
      <slot />
    </div>
    <Footer :title="website"></Footer>
  </div>
</template>
