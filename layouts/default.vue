<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();
function logoutHandler() {
  supabase.auth.signOut();
  location.reload();
}
</script>

<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-2 flex justify-between items-center">
      <div class="flex items-center">
        <a class="flex items-center" href="/">
          <span class="ml-2 text-lg font-semibold text-gray-800"
            >Shortener</span
          >
        </a>
      </div>

      <div class="flex items-center space-x-4">
        <div v-if="user">
          <Button @click="logoutHandler" class="bg-blue-500 text-white"
            >Log out</Button
          >
        </div>
        <div v-else class="flex space-x-2">
          <a
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            href="/login"
            >Log in</a
          >
          <a
            class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
            href="/signup"
            >Sign up</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>
