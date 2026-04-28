<template>
  <nav>
    <RouterLink to="/dashboard">Dashboard</RouterLink>

    <RouterLink v-if="auth.isSeller" to="/seller">
      Seller Panel
    </RouterLink>

    <RouterLink v-if="auth.isAdmin" to="/admin">
      Admin Panel
    </RouterLink>

    <button v-if="auth.isAuthenticated" @click="logout">
      Logout
    </button>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();
const router = useRouter();

const logout = async () => {
  await auth.logout();
  router.push("/login");
};
</script>