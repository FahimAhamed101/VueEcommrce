// src/stores/auth.js
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async register(data) {
      this.loading = true;
      this.error = null;

      try {
        const res = await axios.post("/api/auth/register", data, {
          withCredentials: true,
        });

        this.user = res.data.user;
      } catch (err) {
        this.error = err.response?.data?.message || "Registration failed";
      } finally {
        this.loading = false;
      }
    },

    async login(data) {
      this.loading = true;
      this.error = null;

      try {
        const res = await axios.post("/api/auth/login", data, {
          withCredentials: true,
        });

        this.user = res.data.user;
      } catch (err) {
        this.error = err.response?.data?.message || "Login failed";
      } finally {
        this.loading = false;
      }
    },

    async fetchUser() {
      try {
        const res = await axios.get("/api/auth/me", {
          withCredentials: true,
        });

        this.user = res.data.user;
      } catch {
        this.user = null;
      }
    },

    async logout() {
      await axios.post("/api/auth/logout", {}, {
        withCredentials: true,
      });

      this.user = null;
    },
  },
});