<script setup lang="ts">
import { ref } from "vue";
import { cn } from "@/lib/utils";
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
import Label from "@/components/ui/label/Label.vue";

const props = defineProps<{
  authMode: "login" | "create";
}>();
const supabase = useSupabaseClient();
async function loginHandler(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log("Error logging in:", error);
  } else {
    navigateTo("/");
    console.log("Logged in:", data);
  }
}
async function newAccountHandler(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.log("Error creating account:", error);
  } else {
    navigateTo("/");
    console.log("Account created:", data);
  }
}
async function onSubmit(event: Event, authMode: "login" | "create") {
  event.preventDefault();
  const email = (event.target as HTMLFormElement).email.value;
  const password = (event.target as HTMLFormElement).password.value;
  if (authMode === "login") {
    if (email && password) {
      loginHandler(email, password);
    }
  }
  if (
    authMode === "create" &&
    password === (event.target as HTMLFormElement).confirmPassword.value
  ) {
    newAccountHandler(email, password);
  } else if (authMode === "create") {
    alert("Passwords do not match");
  } else {
  }
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit($event, props.authMode)">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email"> Email </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
          />
        </div>
        <Label class="sr-only" for="password"> Password </Label>
        <Input
          id="password"
          placeholder="Password"
          type="password"
          auto-complete="current-password"
          minlength="6"
        />
        <Input
          :class="
            props.authMode === 'create' ? '' : 'opacity-0 pointer-events-none'
          "
          id="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          auto-complete="new-password"
        />
        <button variant="default" type="submit">
          {{ props.authMode === "create" ? "Create Account" : "Log in" }}
        </button>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
    <Button variant="outline" @click="console.log('github')"> GitHub </Button>
  </div>
</template>
