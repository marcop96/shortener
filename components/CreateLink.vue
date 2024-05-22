<script setup lang="ts">
import { ref } from "vue";
const supabase = useSupabaseClient();
const long_url = ref("");
const short_url = ref("");
const url_id = ref("");

const shortenLink = async () => {
  console.log(long_url.value);

  const { data, error } = await supabase.from("shortened_urls").insert([
    {
      long_url: long_url.value,
      short_url: "38493e3",
      url_id: 45,
      user_id: 129,
      usage_count: 0,
    },
  ]);
};
</script>
<template>
  <div>
    <form @submit.prevent="shortenLink">
      <input
        type="text"
        v-model="long_url"
        placeholder="Enter URL"
        class="p-2 border border-gray-300 rounded-md"
      />
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">
        Shorten
      </button>
    </form>
  </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>
