<script setup lang="ts">
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { Row } from '~/types';

const supabase = useSupabaseClient();
const long_url = ref("");
const user_id = (await supabase.auth.getUser()).data.user?.id;
const newUrl = ref<undefined | Row>(undefined);

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

const shortenLink = async () => {
  if (!isValidUrl(long_url.value)) {
    alert("Invalid URL");
    return;
  }
  
  newUrl.value = {
    long_url: long_url.value,
    short_url: Math.random().toString(36).substring(7),
    url_id: uuidv4(),
    creation_date: new Date().toISOString(),
    user_id: user_id,
    usage_count: 0,
  };

  const { error } = await supabase.from("shortened_urls").insert([newUrl.value]);

  if (error) {
    console.error("Error creating shortened URL:", error);
  } else {
    long_url.value = "";
  }
};
</script>

<template>
  <div class="relative">
    <main>
      <form @submit.prevent="shortenLink">
        <input
          type="text"
          v-model="long_url"
          placeholder="Enter URL"
          class="p-2 border border-gray-300 rounded-md mb-4"
        />
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">
          Shorten
        </button>
      </form>
    </main>

    <section v-if="newUrl" class="flex items-center justify-center mx-12 mt-4">
      <table class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Shortened URL</th>
            <th>Date</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <NuxtLink :to="newUrl.short_url">{{ newUrl.short_url }}</NuxtLink>
            </td>
            <td class="max-w-1/3 overflow-hidden">{{ newUrl.long_url }}</td>
            <td>{{ newUrl.creation_date }}</td>
            <td>{{ newUrl.usage_count }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
</style>
