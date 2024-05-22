<script setup lang="ts">
import { ref } from "vue";
const supabase = useSupabaseClient();
const long_url = ref("");
const short_url = ref("");
const url_id = ref("");
const user_id = (await supabase.auth.getUser()).data.user?.id;
const shortenLink = async () => {
  console.log(long_url.value);
  console.log(short_url.value);
  console.log(url_id.value);
  console.log(user_id);

  const { data, error } = await supabase.from("shortened_urls").insert([
    {
      long_url: long_url.value,
      short_url: short_url.value,
      url_id: Number(Math.random().toString(36).substring(7)),
      user_id: (await supabase.auth.getUser()).data.user?.id,
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
