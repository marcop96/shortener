<script setup lang="ts">
import type { UrlEntity } from "~/types";
import { useToast } from "@/components/ui/toast/use-toast";
import { Toaster } from "@/components/ui/toast";
// import validateURL from "~/composables/ValidateURL";
const { toast } = useToast();
const { isMobile } = useDevice();
const isLoading = ref(true);
const props = defineProps<{
  shortened_urls: UrlEntity[];
}>();
const client = useSupabaseClient();
const updatedList = ref<UrlEntity[]>(props.shortened_urls.map(url => ({ ...url, editable: false })));


async function deleteRow(row: UrlEntity) {
  try {
    const { error } = await client
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

// function selectEdit(row: UrlEntity) {
// }
// async function confirmEdit(row: UrlEntity) {

//   if (!validateURL(row.long_url)) {

//     return;
//   }
//   const { error } = await client
//     .from("shortened_urls")
//     .update({
//       long_url: row.long_url
//     })
//     .eq("url_id", row.url_id);

//   if (error) {
//     console.error("Error updating row:", error.message);
//   } else {

//     toast({
//       title: 'Success',
//       description: "Your URL has been updated",
//       variant: "default",
//     });

//   }
// }
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
    <Toaster />
    <div v-if="isLoading" class="mx-auto">Loading...</div>
    <Table v-else class="w-1/2 justify-center mx-auto">
      <TableCaption v-if="updatedList.length > 0">List of your Links</TableCaption>
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
        <TableRow v-for="url in updatedList" :key="url.short_url">
          <TableCell class="font-medium w-2/4">
            <NuxtLink v-if='!url.editable' :to="url.short_url" target="_blank">{{
              url.short_url
            }}</NuxtLink>
            <br>
            <!-- <Input v-if='url.editable' v-model="url.long_url" /> -->
            <NuxtLink  :to="url.long_url" target="_blank" class="text-xs text-gray-400">{{
              url.long_url }}</NuxtLink>
          </TableCell>

          <TableCell class="h-24">
            <p v-if="url.qr_code === ''">No</p>
            <img v-else :src="url.qr_code" alt="QR Code">
          </TableCell>
          <TableCell v-if="!isMobile" class="text-right">
            {{ url.usage_count }}
          </TableCell>
          <TableCell>
            <!-- <Button v-if='!url.editable' variant="secondary" class="hover:cursor-pointer" @click='selectEdit(url)'>
              edit</Button> -->
            <!-- <Button v-else class="hover:cursor-pointer" variant="default" @click="confirmEdit(url)">confirm</Button> -->

            <Button v-if="!url.editable" class="hover:cursor-pointer" variant="destructive" @click="deleteRow(url)">
              Delete
            </Button>

          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<style scoped></style>
