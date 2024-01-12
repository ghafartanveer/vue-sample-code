<template>
  <v-app>
    <ToasterAlert />
    <!-- <h1>
      {{route.path}}
    </h1>
    <h2>
      {{showSidebar}}
    </h2>
    -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import HeaderBar from "./components/HeaderBar.vue";
import ToasterAlert from "./components/ToasterAlert.vue";

import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";

export default {
  name: "App",
  components: { Sidebar, HeaderBar, ToasterAlert },

  setup() {
    const route = useRoute();
    const router = useRouter();

    // let showSidebar = ref(false);

    // THIS IS WORKING FOR HIDING THE SIDEBAR ON THE LOGIN PAGE (Temporarily using it)
    // Will remove it in the Future when Login API is integrated.
    // Keep this for now but, hide the sidebar when the response of the login request is true.
    // onMounted( async () => {
    //   await router.isReady();
    //   console.log("🚀 ~ file: App.vue:26 ~ setup ~ route.path:", route.path)
    //   // Over Here we can use the condition to see if the current path is "/" or "/login"
    //   // If either of the conditions above are True, then we will 'HIDE' the Sidebar.
    //   // Otherwise we will 'SHOW' the sidebar.

    //   if (route.path == '/' || route.path == '/login'){
    //     showSidebar.value = false;
    //   } else{
    //     showSidebar.value = true;
    //   }
    // } );

    // toasterAlert
    return { route }; //showSidebar
  }
};
</script>

<style>
</style>
