<script setup lang="ts">
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { Row } from '~/types';

const supabase = useSupabaseClient();
const user_id = useSupabaseUser().value?.id;

const long_url = ref("");
const newUrl = ref<undefined | Row>(undefined);
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    alert("Invalid URL");
    return false;
  }
}
function checkUser () {
  if(user_id === undefined || user_id === null) {
    alert("User is not logged in.");
    return;
  }
}
const shortenLink = async () => {
  checkUser()
  if (!isValidUrl(long_url.value)) {
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
    <main class="flex justify-center">
      <form @submit.prevent="shortenLink" class="mx-auto ">
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
      <div class="flex items-center w-full">
        <Table class="w-1/2 justify-center mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Original URL</TableHead>
              <TableHead>Short URL</TableHead>
              <TableHead>Creation Date</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell class="font-medium w-2/4">
                  <NuxtLink :to="newUrl.long_url" target="_blank">{{ newUrl.long_url }}</NuxtLink>
                </TableCell>
                <TableCell>
                  <NuxtLink :to="newUrl.short_url" target="_blank">{{ newUrl.short_url }}</NuxtLink>
                </TableCell>
                <TableCell>{{ new Date(newUrl.creation_date).toLocaleDateString() }}</TableCell>
                <TableCell class="text-right">
                  {{ newUrl.usage_count }}
                </TableCell>
              </TableRow>
            </TableBody>
        </Table>
      </div>
    </section>
  </div>
</template>

<style scoped>
</style>
