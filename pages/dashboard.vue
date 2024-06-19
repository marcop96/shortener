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
  <div>test</div>

  <LinksDashboard :shortened_urls="shortened_urls" />
</template>
