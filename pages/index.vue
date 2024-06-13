<script setup lang="ts">
import LinksDashboard from "~/components/LinksDashboard.vue";
import CreateLink from "~/components/CreateLink.vue";
import { ref, watch, onMounted } from "vue";
definePageMeta({
  title: "Shorten your URLs",
  description: "Shorten your URLs with ease.",
});

const client = useSupabaseClient();
const user = useSupabaseUser();
const activeSite = ref<"table" | "create">("create");
const shortened_urls = ref([]);

async function getShortenedUrls() {
  if (user.value) {
    const { data, error } = await client
      .from("shortened_urls")
      .select()
      .eq("user_id", user.value.id);

    if (error) {
      console.error("Error fetching shortened URLs:", error);
    } else {
      shortened_urls.value = data;
    }
  } else {
    console.error("User is not logged in.");
  }
}

function swapTabs(tab: "table" | "create") {
  activeSite.value = tab;
  getShortenedUrls();
}

onMounted(() => {
  getShortenedUrls();
});

watch(user, (newUser) => {
  if (newUser) {
    getShortenedUrls();
  } else {
    shortened_urls.value = [];
  }
});
</script>

<template>
  <div class="flex flex-col items-center self-center mx-auto p-4 min-h-screen">
    <div class="space-x-4 mb-4">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="swapTabs('table')"
      >
        Table
      </button>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="swapTabs('create')"
      >
        Create
      </button>
    </div>
    <div class="relative w-full">
      <Transition name="fade">
        <LinksDashboard
          v-if="activeSite === 'table'"
          :shortened_urls="shortened_urls"
        />
      </Transition>
      <Transition name="fade">
        <CreateLink v-if="activeSite === 'create'" />
      </Transition>
    </div>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
