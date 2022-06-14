<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="w-full flex justify-begin py-10">
    <h1 class="text-2xl ml-10">{{ title ?? "panal" }}</h1>
  </div>
</template>
