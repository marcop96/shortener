<script setup lang="ts">
import { Auth } from "@nuxtbase/auth-ui-vue";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = useSupabaseClient();

const loading = ref(false);
const email = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    if (!email.value) {
      throw new Error("Email is required");
    }
    const { error } = await supabase.auth.signInWithOtp({ email: email.value });

    if (error) {
      throw error;
    }

    alert("Check your email for the login link!");
  } catch (error: any) {
    const errorMessage =
      error.error_description || error.message || "An unknown error occurred";
    alert(errorMessage);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <main class="">
    <Auth
      :supabaseClient="supabase"
      :appearance="{
        theme: ThemeSupa,
      }"
      :providers="['google', 'facebook', 'twitter']"
    />
  </main>
</template>
