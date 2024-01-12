<template>
  <div>
    <Sidebar />
    <HeaderBar />
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from "../../components/Sidebar.vue";
import HeaderBar from "../../components/HeaderBar.vue";

export default {
  components: { Sidebar, HeaderBar }
};
</script>

<style>
</style>