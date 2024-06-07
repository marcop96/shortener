<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "~/components/ui/toast/use-toast";
import { Toaster, ToastAction } from "~/components/ui/toast";
const toast = useToast();
const supabase = useSupabaseClient();
const loginEmail = ref("");
const loginPassword = ref("");

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
</script>

<template>
  <Toaster />
  <div class="flex justify-center items-center w-1/2 mx-auto p-4">
    <Card>
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>Enter your account details to login</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid grid-cols-2 gap-6">
          <Button variant="outline">
            <!-- <GitHubIcon class="mr-2 h-4 w-4" /> -->
            Github
          </Button>
          <Button variant="outline">
            <!-- <GoogleIcon class="mr-2 h-4 w-4" /> -->
            Google
          </Button>
        </div>
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
        <form @submit.prevent="loginHandler(loginEmail, loginPassword)">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              v-model="loginEmail"
            />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input id="password" type="password" v-model="loginPassword" />
          </div>
          <CardFooter class="p-2 mt-2">
            <Button class="w-full" type="submit">Log in</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
