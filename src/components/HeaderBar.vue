<template>
  <div>
    <div class="header-bar-container">
      <h1 class="route-title">
        <i>{{currentRouteName}}</i>
      </h1>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="John Leider"
      ></v-list-item>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

import { useUserAuth } from "../store/UserAuth";

export default {
  setup() {
    const userAuth = useUserAuth();
    const route = useRoute();
    let currentRouteName = ref("");

    watchEffect(() => {
      currentRouteName.value = route.name;
    });

    return { userAuth, currentRouteName };
  }
};
</script>

<style lang="css" scoped>
.header-bar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0px 28px 0px 24px;
}

.route-title {
  color: #9a8762;
}
</style>

