<!-- src/pages/Register.vue -->
<template>
  <div>
    <h2>Register</h2>

    <form @submit.prevent="handleRegister">
      <input v-model="form.name" type="text" placeholder="Name" />
      <input v-model="form.email" type="email" placeholder="Email" />
      <input v-model="form.password" type="password" placeholder="Password" />

      <select v-model="form.role">
        <option value="user">User</option>
        <option value="seller">Seller</option>
      </select>

      <button type="submit" :disabled="auth.loading">
        {{ auth.loading ? "Creating account..." : "Register" }}
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
  name: "",
  email: "",
  password: "",
  role: "user",
});

const handleRegister = async () => {
  const success = await auth.register(form);

  if (success) {
    if (auth.isSeller) router.push("/seller");
    else router.push("/dashboard");
  }
};
</script>