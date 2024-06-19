<script setup lang="ts">
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import type { Row } from "~/types";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import checkUser from "~/composables/checkUser";
import generateQR from "~/composables/generateQR";

const supabase = useSupabaseClient();
const user_id = useSupabaseUser().value?.id;
const defaultURL = "https://localhost:3000/";
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

const shortenLink = async (type: "link" | "qr") => {
  checkUser();
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
    qr_code: "",
  };
  if (type === "qr") {
    newUrl.value.qr_code = await generateQR(
      defaultURL + newUrl.value.short_url
    );
    console.log(newUrl.value.qr_code);
  }
  const { error } = await supabase
    .from("shortened_urls")
    .insert([newUrl.value]);

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
      <form @submit.prevent="" class="mx-auto">
        <Input
          type="text"
          v-model="long_url"
          placeholder="Enter URL"
          class="m-2"
        />
        <Button @click="shortenLink('link')" type="submit" class="mx-2">
          Shorten
        </Button>
        <Button @click="shortenLink('qr')" type="submit" class="mx-2"
          >Shorten + QR</Button
        >
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
              <TableHead>QR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell class="font-medium w-2/4">
                <NuxtLink :to="newUrl.long_url" target="_blank">{{
                  newUrl.long_url
                }}</NuxtLink>
              </TableCell>
              <TableCell>
                <NuxtLink :to="newUrl.short_url" target="_blank">{{
                  newUrl.short_url
                }}</NuxtLink>
              </TableCell>
              <TableCell>{{
                new Date(newUrl.creation_date).toLocaleDateString()
              }}</TableCell>
              <TableCell class="text-right">
                {{ newUrl.usage_count }}
              </TableCell>
              <TableCell> <img :src="newUrl.qr_code" /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
