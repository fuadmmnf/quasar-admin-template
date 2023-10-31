import { api } from "boot/axios";
import { defineStore } from "pinia";

const defaultStore = () => {
  return {
    counter: 0,
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    user: null,
    categories: [],
    subcategories: [],
  };
};

export const useStore = defineStore("store", {
  state: () => defaultStore(),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    resetState() {
      Object.assign(this, defaultStore());
    },

    async getCategories() {
      await api
        .get("/categories/category?limit=0")
        .then((response) => {
          this.categories = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      this.isAuthenticated = false;
    },
  },
});
