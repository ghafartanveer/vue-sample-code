import { defineStore } from "pinia";
import TokenService from "@/services/token.service";
import { useToasterAlert } from "./ToasterAlert";
import router from "../router";
import axios from "axios";

export const useUserAuth = defineStore("UserAuth", {
  state: () => ({
    isUserAuth: false,
  }),

  getters: {
    getUserAuth(state) {
      return state.isUserAuth;
    },
  },

  actions: {
    setUserAuth(isUserPresent) {
      this.isUserAuth = isUserPresent;
    },

    // Pinia Async Actions:
    // https://pinia.vuejs.org/core-concepts/actions.html
    async loginUser(payload) {
      try {
        const resp = await axios.post("/auth", payload);

        if (resp?.data?.token) {
          TokenService.setUser(resp.data);

          useToasterAlert().setToaster({
            message: "Login Successful",
            icon: "mdi-check-circle-outline",
            color: "#20382C",
            display: true,
          });

          router.push({ name: "Administrator Dashboard" });
        }
      } catch (error) {
        console.error(error);

        useToasterAlert().setToaster({
          message: "Invalid Credentials",
          icon: "mdi-close-circle-outline",
          color: "#B00020",
          display: true,
        });
        return error;
      }
    },

    logoutUser() {
      TokenService.removeUser();
      return;
    },
  },
});
