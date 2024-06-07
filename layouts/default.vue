<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <pre v-if="user">{{ user.role }}</pre>
</template>
