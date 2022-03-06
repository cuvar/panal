<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="w-full flex justify-center py-10 shadow-md">
    <p>{{ title ?? "panal" }}</p>
  </div>
</template>
