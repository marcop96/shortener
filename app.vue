<script setup lang="ts">
const client = useSupabaseClient();
const shortened_urls = ref();

async function getShortenedUrls() {
  const { data } = await client.from("shortened_urls").select();
  shortened_urls.value = data;
}

onMounted(() => {
  getShortenedUrls();
});
</script>

<template><NuxtPage /></template>
