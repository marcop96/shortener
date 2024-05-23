<script setup lang="ts">
import LinksDashboard from "~/components/LinksDashboard.vue";
import CreateLink from "~/components/CreateLink.vue";
const client = useSupabaseClient();
const user = useSupabaseUser();
const activeSite = ref<"table" | "create">("create");
const shortened_urls = ref();
// definePageMeta({
//   middleware: ['auth']
// });

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

