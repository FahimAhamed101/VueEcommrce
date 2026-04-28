<!-- src/pages/Login.vue -->
<template>
  <div>
    <h2>Login</h2>

    <form @submit.prevent="handleLogin">
      <input v-model="form.email" type="email" placeholder="Email" />
      <input v-model="form.password" type="password" placeholder="Password" />

      <button type="submit" :disabled="auth.loading">
        {{ auth.loading ? "Logging in..." : "Login" }}
      </button>

      <p v-if="auth.error">{{ auth.error }}</p>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const auth = useAuthStore();

const form = reactive({
  email: "",
  password: "",
});

const handleLogin = async () => {
  const success = await auth.login(form);

  if (success) {
    if (auth.isAdmin) router.push("/admin");
    else if (auth.isSeller) router.push("/seller");
    else router.push("/dashboard");
  }
};
</script>