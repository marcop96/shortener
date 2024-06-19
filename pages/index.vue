<script setup lang="ts">
import CreateLink from "~/components/CreateLink.vue";
</script>

<template>
  <CreateLink class="mt-12" />
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
