<script setup lang="ts">
import UserAuthForm from "../components/UserAuthForm.vue";
import Button from "~/components/ui/button/Button.vue";
definePageMeta({
  title: "Shorten your URLs",
  description: "Shorten your URLs with ease.",
});
const CREATE_ACCOUNT_TEXT = {
  title: "Create an account",
  instructions: "Enter your email below to create your account",
  button: "Create account",
  switch: "Already have an account?",
};

const LOGIN_TEXT = {
  title: "Log in",
  instructions: "Enter your email and password to log in",
  button: "Log in",
  switch: "Don't have an account?",
};
const authMode = ref<"login" | "create">("login");
function toggleAuthMode() {
  authMode.value === "create"
    ? (authMode.value = "login")
    : (authMode.value = "create");
}
</script>

<template>
  <div class="container flex flex-col items-center justify-center h-screen">
    <div class="lg:p-8 mx-auto">
      <div class="w-full max-w-sm black p-6 rounded-lg shadow-lg">
        <div class="flex flex-col space-y-4 items-center justify-center">
          <Button
            @click="toggleAuthMode"
            variant="outline"
            class="hover:cursor-pointer"
          >
            {{
              authMode === "create"
                ? CREATE_ACCOUNT_TEXT.switch
                : LOGIN_TEXT.switch
            }}
          </Button>
          <h1 class="text-2xl font-semibold tracking-tight">
            {{
              authMode === "login"
                ? LOGIN_TEXT.title
                : CREATE_ACCOUNT_TEXT.title
            }}
          </h1>
          <p class="text-sm text-muted-foreground">
            {{
              authMode === "login"
                ? LOGIN_TEXT.instructions
                : CREATE_ACCOUNT_TEXT.instructions
            }}
          </p>
        </div>
        <UserAuthForm :authMode="authMode" />
        <p class="px-8 text-center text-sm text-muted-foreground mt-4">
          By clicking continue, you agree to our
          <a
            href="/terms"
            class="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>
          and
          <a
            href="/privacy"
            class="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy </a
          >.
        </p>
      </div>
    </div>
  </div>
</template>
