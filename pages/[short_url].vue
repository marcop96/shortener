<script setup lang="ts">
import type { Row } from "~/types";

const client = useSupabaseClient();
const route = useRoute();
const path = ref<string>("");

async function getLongUrl() {
  try {
    const { data, error } = await client
      .from("shortened_urls")
      .select()
      .eq("short_url", route.params.short_url);

    if (error) {
      console.error(error);
      return;
    }

    if (data && data.length > 0) {
      const row: Row = data[0];
      await client
        .from("shortened_urls")
        .update({ usage_count: row.usage_count + 1 })
        .eq("short_url", route.params.short_url);
      path.value = row.long_url;
    } else {
      console.error("No data found");
    }
  } catch (error) {
    console.error("Error fetching long URL:", error);
  }
}

onBeforeMount(async () => {
  await getLongUrl();
  console.log(path.value);
  if (path.value) {
    await navigateTo(path.value, {
      external: true,
    });
  }
});
</script>

<template>
  <div class="lds-ripple"></div>
</template>

<style scoped>
.lds-ripple,
.lds-ripple div {
  box-sizing: border-box;
}
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid currentColor;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 8px;
    height: 8px;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 8px;
    height: 8px;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 8px;
    height: 8px;
    opacity: 1;
  }
  100% {
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    opacity: 0;
  }
}
</style>
