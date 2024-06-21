<script setup lang="ts">
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import type { UrlEntity } from "~/types";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import checkUser from "~/composables/checkUser";
import generateQR from "~/composables/generateQR";
import checkValidURL from "~/composables/checkValidURL";
const runtimeConfig = useRuntimeConfig();
const supabase = useSupabaseClient();
const user_id = useSupabaseUser().value?.id;
const long_url = ref("");
const newUrl = ref<undefined | UrlEntity>(undefined);
const highlighted = ref(false);
const shortenLink = async (type: "link" | "qr") => {
  highlighted.value = false

  checkUser();
  if (!checkValidURL(long_url.value)) {
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
      runtimeConfig.public.baseURL + newUrl.value.short_url
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

const copyToClipboard = (text: string) => {
  highlighted.value = true;
  navigator.clipboard.writeText(runtimeConfig.public.baseURL + '/' + text);
};
</script>

<template>
  <div class="relative">
    <main class="flex justify-center">
      <form class="mx-auto" @submit.prevent="">
        <Input v-model="long_url" type="text" placeholder="Enter URL" class="m-2" />
        <Button type="submit" class="mx-2 hover:cursor-pointer" @click="shortenLink('link')">
          Shorten
        </Button>
        <Button type="submit" class="mx-2 hover:cursor-pointer" @click="shortenLink('qr')">Shorten + QR</Button>
      </form>
    </main>

    <!-- <section v-if="newUrl" class="flex items-center justify-center mx-12 mt-4">
      <div class="flex items-center w-full">
        <Table class="w-1/2 justify-center mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Original URL</TableHead>
              <TableHead>Short URL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell class="font-medium w-4/5">
                <NuxtLink :to="newUrl.long_url" target="_blank">{{
                  newUrl.long_url
                }}</NuxtLink>
              </TableCell>
              <TableCell>
                <NuxtLink :to="newUrl.short_url" target="_blank">{{
                  newUrl.short_url
                }}</NuxtLink>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
    <section v-if="newUrl" class="flex justify-center items-center">
      <img :src="newUrl.qr_code">
    </section> -->
    <section v-if="newUrl" class="mt-24">
      <div class="flex flex-row justify-center items-center">
        <Input v-model="newUrl.short_url" readonly :class='highlighted ? "border border-2 border-green-300" : ""'
          class="w-fit text-center bg-gray-100 p-2 rounded-lg" />
        <Button class="m-2 hover:cursor-pointer" @click="copyToClipboard(newUrl!.short_url)">Copy</Button>
      </div>
      <div class="flex flex-row justify-center items-center">
        <img :src="newUrl.qr_code">
      </div>
    </section>
  </div>
</template>
