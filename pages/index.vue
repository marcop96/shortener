<script setup lang="ts">
import LinksDashboard from "~/components/LinksDashboard.vue";
import CreateLink from "~/components/CreateLink.vue";
const client = useSupabaseClient();
const shortened_urls = ref();
const activeSite = ref<"table" | "create">("create");
async function getShortenedUrls() {
  const { data } = await client.from("shortened_urls").select();
  shortened_urls.value = data;
}

onMounted(() => {
  getShortenedUrls();
});
</script>

<template>
  <template>
    <div class="flex flex-col items-center self-center mx-auto p-4">
      <div class="space-x-4 mb-4">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="activeSite = 'table'"
        >
          Table
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="activeSite = 'create'"
        >
          Create
        </button>
      </div>

      <LinksDashboard
        v-if="activeSite === 'table'"
        :shortened_urls="shortened_urls"
      />
      <CreateLink v-if="activeSite === 'create'" />
    </div>
  </template>
</template>
