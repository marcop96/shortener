<script setup lang="ts">


const client = useSupabaseClient();
const route = useRoute();
const path = ref<string>('');

async function getLongUrl() {
  try {
    const { data, error } = await client
      .from('shortened_urls')
      .select()
      .eq('short_url', route.params.short_url);

    if (error) {
      console.error(error);
      return;
    }

    if (data && data.length > 0) {
      path.value = data[0].long_url;
    } else {
      console.error('No data found');
    }
  } catch (error) {
    console.error('Error fetching long URL:', error);
  }
}

onMounted(async () => {
  await getLongUrl();
  console.log(path.value);
  if (path.value) {
    window.location.replace(path.value);
  }
});
</script>

<template>
LOADING</template>
