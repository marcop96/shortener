<script setup lang="ts">
import type { Row } from "~/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const client = useSupabaseClient();
const props = defineProps<{
  shortened_urls: Row[];
}>();
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
      updatedList.value = updatedList.value.filter(
        (item) => item.url_id !== row.url_id
      );
      console.log("Deleted row:", row);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

watch(
  () => props.shortened_urls,
  (newUrls) => {
    updatedList.value = newUrls;
  }
);
</script>

<template>
  <div class="flex items-center w-full">
    <Table class="w-1/2 justify-center mx-auto">
      <TableCaption v-if="updatedList.length > 0"
        >List of your Links</TableCaption
      >
      <TableCaption v-else>Create a short URL to see them here</TableCaption>

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
        <TableRow v-for="url in updatedList">
          <TableCell class="font-medium w-2/4">
            <NuxtLink :to="url.long_url" target="_blank">{{
              url.long_url
            }}</NuxtLink>
          </TableCell>
          <TableCell>
            <NuxtLink :to="url.short_url" target="_blank">{{
              url.short_url
            }}</NuxtLink></TableCell
          >
          <TableCell>{{
            new Date(url.creation_date).toLocaleDateString()
          }}</TableCell>
          <TableCell class="text-right">
            {{ url.usage_count }}
          </TableCell>
          <TableCell>
            <Button @click="deleteRow(url)" variant="destructive">
              Delete
            </Button></TableCell
          >
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<style scoped></style>
