<script setup lang="ts">
import { Auth } from "@nuxtbase/auth-ui-vue";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = useSupabaseClient();
definePageMeta({
  middleware: ['auth']
})
watchEffect(() => {
  if (useSupabaseUser().value) {
    setTimeout(()=> navigateTo('/'), 1000)
  }
})
const loading = ref(false);
const email = ref("");
const password = ref("");

// const handleLogin = async () => {
//   try {
//     loading.value = true;
//     if (!email.value) {
//       throw new Error("Email is required");
//     }
//     if(!password.value) {
//       throw new Error("Password is required");
//     }

  

//   } catch (error: any) {
//     const errorMessage =
//       error.error_description || error.message || "An unknown error occurred";
//     alert(errorMessage);
//   } finally {
//     loading.value = false;
//   }
// };
const handleLogin = async () => {
  loading.value = true
  const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: '/'
  }
})
  if (error) {
    loading.value = false
    alert('Invalid login credentials')
  } else {
    loading.value = false
    alert('Login successful')
    return navigateTo('/')    
  }
}


</script>
<template>
  <main class="">
    <!-- <div class="flex flex-col items-center self-center mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Login</h1>
      <form @submit.prevent="handleLogin">

        <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="border border-gray-300 p-2 rounded mb-4"
        />
        <input v-model='password' type="password" placeholder="Password" class="border border-gray-300 p-2 rounded mb-4" />
        <button
        
        :disabled="loading"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
        Login
      </button>
      </form>
      </div> -->
  <Auth @update:view="console.log($event)"
      :supabaseClient="supabase"
      :appearance="{
        theme: ThemeSupa,
      }"
      :providers="['google', 'github', 'twitter']"
    /> 
  </main>
</template>
