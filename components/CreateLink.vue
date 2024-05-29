<script setup lang="ts">
import { ref } from "vue";
import { v4 as uuidv4 } from 'uuid';

const supabase = useSupabaseClient();
const long_url = ref("");
const short_url = ref("");
const user_id = (await supabase.auth.getUser()).data.user?.id;
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
const shortenLink = async () => {
  if(!isValidUrl(long_url.value)) {
    alert("Invalid URL");
    return;
  }
  const { data, error } = await supabase.from("shortened_urls").insert([
    {
      long_url: long_url.value,
      short_url: Math.random().toString(36).substring(7),
      url_id: uuidv4(),
      user_id:user_id,
      usage_count: 0,
    },
  ]);
  long_url.value = "";
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
