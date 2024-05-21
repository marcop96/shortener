<script setup lang="ts">
const supabase = useSupabaseClient();

const loading = ref(false);
const email = ref("");

const handleLogin = async () => {
  try {
    loading.value = true; // Start loading
    if (!email.value) {
      throw new Error("Email is required");
    }
    const { error } = await supabase.auth.signInWithOtp({ email: email.value });

    if (error) {
      throw error;
    }

    alert("Check your email for the login link!");
  } catch (error) {
    // Use a default message if error_description is not available
    const errorMessage =
      error.error_description || error.message || "An unknown error occurred";
    alert(errorMessage);
  } finally {
    loading.value = false; // Stop loading
  }
};
</script>
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
