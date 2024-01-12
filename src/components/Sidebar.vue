<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" permanent temporary @click="rail = false">
    <!-- v-model="drawer" -->
    <!-- v-model="userAuth.getUserAuth" -->

    <!-- permanent
    temporary-->
    <!-- You are going to have to play around with these two props to make it responsive for mobile -->

    <!-- This snippet below is used to add the mini-variant -->
    <!-- <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
    </v-list-item>-->

    <p class="trove-sidebar-title">TROVE</p>

    <!-- <v-divider></v-divider> -->

    <!-- <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard-outline" title="Dashboard" value="Dashboard"></v-list-item>
          <v-list-item prepend-icon="mdi-gift-outline" title="Manage User Accounts" value="ManageUserAccounts"></v-list-item>
          <v-list-item prepend-icon="mdi-wallet-outline" title="Purchase Pipeline" value="PurchasePipeline"></v-list-item>
          <v-list-item prepend-icon="mdi-logout" title="Logout" value="Logout" @click="logoutUser"></v-list-item>
    </v-list>-->

    <v-list class="sidebar-links" density="compact" nav :key="logoutKey">
      <div v-for="adminRoute in adminRoutes" :key="adminRoute.title">
        <v-list-item
          :prepend-icon="adminRoute.icon"
          :title="adminRoute.title"
          :value="adminRoute.value"
          :to="adminRoute.path"
        ></v-list-item>
      </div>
      <v-list-item prepend-icon="mdi-logout" title="Logout" value="Logout" @click="logoutUser"></v-list-item>
    </v-list>
    <!-- <template v-slot:append>
    </template>-->
  </v-navigation-drawer>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";

import { useUserAuth } from "../store/UserAuth";

export default {
  props: [],

  setup(props, context) {
    let drawer = ref(true);
    let rail = ref(false); // Apparently this is the Equivalent of the mini-variant.
    const router = useRouter();
    const userAuth = useUserAuth();
    let logoutKey = ref(0);

    const logoutUser = () => {
      // userAuth.setUserAuth(false);
      userAuth.logoutUser();
      router.push({ name: "Login" });
      logoutKey.value += 1;

      // // drawer.value = false;  // Toggles the Drawer.
      // // setTimeout( ()=> {
      //     router.push({ name: "Login" });
      //     context.emit("hideSideBar");
      // // }, 200);
    };

    const adminRoutes = ref([
      {
        id: 0,
        icon: "mdi-view-dashboard-outline",
        title: "Dashboard",
        value: "Dashboard",
        path: "/admin/dashboard"
      },
      {
        id: 1,
        icon: "mdi-gift-outline",
        title: "Manage User Accounts",
        value: "ManageUserAccounts",
        path: "/admin/manage-user-accounts"
      },
      {
        id: 2,
        icon: "mdi-wallet-outline",
        title: "Purchase Pipeline",
        value: "Purchase Pipeline",
        path: "/admin/purchase-pipeline"
      }
    ]);

    return {
      drawer,
      rail,
      router,
      userAuth,
      logoutKey,
      logoutUser,
      adminRoutes
    };
  }
};
</script>

<style lang="css">
.sidebar-links .v-list-item__prepend {
  margin: 0px 20px 0px 8px;
}

.sidebar-links .v-list-item__prepend > .v-icon ~ .v-list-item__spacer {
  display: none;
}

.sidebar-links .v-list-item--active > .v-list-item__overlay {
  background: #9a8762;
  opacity: 1;
}

.sidebar-links .v-list-item--nav.v-list-item--active .v-list-item-title {
  position: relative;
  color: #ffffff;
}

.sidebar-links .v-list-item--active .v-list-item__prepend > .v-icon {
  color: #ffffff;
}
</style>


<style lang="css" scoped>
.trove-sidebar-title {
  font-size: 58px;
  color: #20382c;
  font-weight: 300;
  text-align: center;
  /* margin: 20px 0px 12px 0px; */
  margin: 28px 0px 12px 0px;
}
</style>