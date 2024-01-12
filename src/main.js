import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "./assets/global.scss";
import TokenService from "./services/token.service";
// import axios from "axios";
import axios from "axios";

// axios.defaults.baseURL = process.env.VUE_APP_ENDPOINT;
// Apparently this is how the, baseUrl is modified, not via the axiosInstance
// Will have to place this in an env file eventually
// THe Line below messe up you axios requests
// axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://7690-119-153-109-104.ngrok.io";

// Turns out that, you have to send the Token in every request(i.e every API End Point you hit) you make to the Back End.
axios.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
      // config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

// I Have a Feeling that this interceptor worked
// Again, this is to sign out the user Provided the Token Has Expired.
// I saw the response saying token has Expired.
// We only Need this Interceptor for Token Expiry.
// The Interceptor above is used for "Refreshing The Token", No need for this, this is handled on the BE.
// This Interceptor will simply tell me if the token is valid or not.
// If it's Vaid Middle Ware i.e Router Guards will let the User Move Forward.
// Otherwsie it, will remove the User's Data from the FE & Simply Log Out the User & Redirect the User to the Login Page.
// The Login is PERFECTLY FINE.
// It logs the User out if they are Unauthenticated.
// Again, you have to send the Token in every request, so can't rely on this alone.
// TOKEN EXPIRY IS WORKING PERFECTLY FINE.
axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    console.log("🚀 ~🚀🚀🚀🚀🚀🚀🚀 file: main.js:45 ~ error:", error);
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      // if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // store.dispatch("LogOut");

      // Un comment these two lines below:
      TokenService.removeUser();
      return router.push("/login");
    }
  }
});

loadFonts();

createApp(App)
  .use(createPinia())
  .use(router)
  .use(store)
  .use(vuetify)
  .mount("#app");
