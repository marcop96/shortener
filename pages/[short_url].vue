<script setup lang="ts">
import { ref } from "vue";
const route = useRoute();
const hello = ref("hello world");

console.log(route.params.short_url);
</script>

<template>
  {{ hello }}
</template>
