<script setup lang="ts">
import CreateAccountForm from '~/components/LoginSite/CreateAccountForm.vue';
import LoginForm from '~/components/LoginSite/LoginForm.vue';
import { Button } from '~/components/ui/button';

const isLogin = ref(true);
  </script>
  
<template>
  <div>
    <div class="flex mx-2 justify-center p-4">
      <Button variant="outline" class="mx-2" @click="isLogin=true">Log In</Button>
      <Button variant="outline" class="mx-2" @click="isLogin=false">Create an account</Button>

    </div>
    <LoginForm v-if="isLogin"/>
    <CreateAccountForm v-else/>
</div>
</template>


<style scoped>
</style>
