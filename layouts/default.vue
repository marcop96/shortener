<script setup lang="ts">
import { ref } from "vue";

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const menuOpen = ref(false);
const route = useRoute()
function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
function logoutHandler() {
  supabase.auth
    .signOut()
    .then(() => {
      navigateTo("/");
    })
    .finally(() => {
      location.reload();
    });
}

</script>
<template>
  <div>
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button -->
            <button
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              @click="toggleMenu">
              <span class="sr-only">Open main menu</span>
              <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="flex-shrink-0 mx-12">
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-center">
              <div v-if="user" class="flex space-x-4">
                <NuxtLink to="/dashboard"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  :class="route.path === '/dashboard' ? 'bg-gray-900 text-white' : ''">
                  Dashboard</NuxtLink>
                <NuxtLink to="/create"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  :class="route.path === '/create' ? 'bg-gray-900 text-white' : ''">
                  Shorten</NuxtLink>
              </div>
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button v-if="user"
              class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              @click="logoutHandler">
              <span>Log out</span>
            </button>

          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div v-if="menuOpen" id="mobile-menu" class="sm:hidden">
        <div v-if="user" class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink to="/dashboard"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Dashboard</NuxtLink>
          <NuxtLink to="/create"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Shorten</NuxtLink>
        </div>
      </div>
    </nav>
    <main>
      <slot />
    </main>
  </div>
</template>

<style>
/* Add any custom styles here */
</style>
