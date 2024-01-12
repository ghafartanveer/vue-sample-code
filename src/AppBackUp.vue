<template>
  <v-app>
    <h1>
      {{route.path}}
    </h1>
    <h2>
      {{showSidebar}}
    </h2>
    
    <div v-if="showSidebar">
      <Sidebar/>
    </div>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

import {useRoute, useRouter} from 'vue-router'
import { onMounted, ref } from 'vue'


export default {
  name: 'App',
   components: { Sidebar },
  // data: () => ({
  //   //
  // }),


   setup() {
    const route = useRoute();
    const router = useRouter();
    let showSidebar = ref(false);

    // YEAHHH 
    // THIS LOGIC CONDITION SEEMS TO BE USELESS
    onMounted( async () => {
      await router.isReady();
      console.log("🚀 ~ file: App.vue:26 ~ setup ~ route.path:", route.path)
      // Over Here we can use the condition to see if the current path is "/" or "/login"
      // If either of the conditions above are True, then we will 'HIDE' the Sidebar.
      // Otherwise we will 'SHOW' the sidebar.

      if (route.path == '/' || route.path == '/login'){
        showSidebar.value = false;
      } else{
        showSidebar.value = true;
      }
    } );

    return { route, showSidebar };
  },


}
</script>
