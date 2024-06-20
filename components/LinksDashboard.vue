<script setup lang="ts">
import type { Row } from "~/types";

const { isMobile } = useDevice();
const isLoading = ref(true);
const props = defineProps<{
  shortened_urls: Row[];
}>();
const client = useSupabaseClient();
const updatedList = ref<Row[]>(props.shortened_urls);
async function deleteRow(row: Row) {
  try {
    const { data, error } = await client
      .from("shortened_urls")
      .delete()
      .eq("url_id", row.url_id);
    if (error) {
      console.error(error.message);
    } else {
      // Update the list immediately
      isLoading.value = false;
      updatedList.value = updatedList.value.filter(
        (item) => item.url_id !== row.url_id
      );
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}
watch(
  () => props.shortened_urls,
  (newUrls) => {
    updatedList.value = newUrls;
    isLoading.value = false;
  }
);
</script>

<template>
  <div class="flex items-center w-full">
    <div v-if="isLoading" class="mx-auto">Loading...</div>
    <Table v-else class="w-1/2 justify-center mx-auto">
      <TableCaption v-if="updatedList.length > 0"
        >List of your Links</TableCaption
      >
      <TableCaption v-else>Create a short URL to see them here</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Original URL</TableHead>
          <TableHead>QR Code</TableHead>
          <TableHead v-if="!isMobile">Clicks</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="url in updatedList">
          <TableCell class="font-medium w-2/4">
            <NuxtLink :to="url.short_url" target="_blank">{{
              url.short_url
            }}</NuxtLink>
            <br >
            <NuxtLink
              :to="url.long_url"
              target="_blank"
              class="text-xs text-gray-400"
              >{{ url.long_url }}</NuxtLink
            >
          </TableCell>

          <TableCell class="h-24">
            <p v-if="url.qr_code === ''">No</p>
            <img v-else :src="url.qr_code" alt="QR Code" >
          </TableCell>
          <TableCell v-if="!isMobile" class="text-right">
            {{ url.usage_count }}
          </TableCell>
          <TableCell>
            <button
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              @click="deleteRow(url)"
            >
              Delete
            </button></TableCell
          >
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<style scoped></style>
