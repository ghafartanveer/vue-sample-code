import { defineStore } from "pinia";
import { useToasterAlert } from "./ToasterAlert";
import axios from "axios";

export const useAdminDashboard = defineStore("AdminDashboard", {
  state: () => ({
    giftsPerPage: [],
    totalGifts: 0,
    giftCountPerPage: 0,
    showTableLoader: true,
  }),

  getters: {
    getGiftsPerPage(state) {
      return state.giftsPerPage;
    },

    getTotalGiftCount(state) {
      return state.totalGifts;
    },

    getGiftCountPerPage(state) {
      return state.giftCountPerPage;
    },

    getGiftTableLoader(state) {
      return state.showTableLoader;
    },
  },

  actions: {
    // Pinia Async Actions:
    // https://pinia.vuejs.org/core-concepts/actions.html
    async setGiftsList(pageNumber) {
      try {
        this.showTableLoader = true;

        const resp = await axios.get(
          `/dashboard/gifts?pageNumber=${pageNumber}`
        );

        if (resp?.data?.data) {
          // TokenService.setUser(resp.data);
          this.giftsPerPage = resp?.data?.data;

          this.totalGifts = resp?.data?.count;

          this.giftCountPerPage =
            (pageNumber - 1) * 10 + resp?.data?.data?.length;

          useToasterAlert().setToaster({
            message: "Gifts Recieved",
            icon: "mdi-check-circle-outline",
            color: "#20382C",
            display: true,
          });
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
      this.showTableLoader = false;
    },
  },
});
