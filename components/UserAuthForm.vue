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
async function onSubmit(event: Event) {
  event.preventDefault();
  console.log("onsubmit");
  const email = (event.target as HTMLFormElement).email.value;
  const password = (event.target as HTMLFormElement).password.value;
  loginHandler(email, password);
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
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
