<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <pre v-if="user">{{ user.role }}</pre>
  <span v-else>Not logged in</span>
</template>
