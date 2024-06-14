<script setup lang="ts">
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
import Label from "@/components/ui/label/Label.vue";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast/use-toast";
import { Toaster } from "@/components/ui/toast";

const { toast } = useToast();

const props = defineProps<{
  authMode: "login" | "create";
}>();

const formData = ref({
  email: "",
  password: "",
  confirmPassword: "",
});

const validations = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
  confirmPassword: {},
};

const v$ = useVuelidate(validations, formData);

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
  if (formData.value.password !== formData.value.confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.log("Error creating account:", error);
    toast({
      title: "Error creating account",
      description: error.message,
      variant: "destructive",
    });
  } else {
    navigateTo("/");
    console.log("Account created:", data);
    toast({
      title: "Account created ",
      description: "Please check your email to confirm your sign",
    });
  }
}

async function submitForm(event: Event) {
  event.preventDefault();
  v$.value.$touch();
  if (v$.value.$invalid) return;
  const email = formData.value.email;
  const password = formData.value.password;

  if (props.authMode === "login") {
    await loginHandler(email, password);
  } else if (props.authMode === "create") {
    await newAccountHandler(email, password);
  }
}
</script>

<template>
  <Toaster />
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="submitForm">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="formData.email"
            placeholder="name@example.com"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
          />
          <p v-if="v$.email.$error" class="text-red-500 text-xs mt-1">
            {{ v$.email.$errors[0]?.$message }}
          </p>
        </div>
        <Label for="password">Password</Label>
        <Input
          id="password"
          v-model="formData.password"
          placeholder="Password"
          type="password"
          auto-complete="current-password"
          minlength="6"
        />
        <p v-if="v$.password.$error" class="text-red-500 text-xs mt-1">
          {{ v$.password.$errors[0]?.$message }}
        </p>
        <div :class="props.authMode === 'create' ? '' : 'hidden'">
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            v-model="formData.confirmPassword"
            placeholder="Confirm Password"
            type="password"
            auto-complete="new-password"
          />
          <p v-if="v$.confirmPassword.$error" class="text-red-500 text-xs mt-1">
            {{ v$.confirmPassword.$errors[0]?.$message }}
          </p>
        </div>
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
    <Button variant="outline" @click="console.log('github')">GitHub</Button>
  </div>
</template>
