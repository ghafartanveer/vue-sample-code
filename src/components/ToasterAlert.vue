<template>
  <v-snackbar
    v-model="toasterAlert.getToaster.displayToaster"
    absolute
    location="top right"
    :color="toasterAlert.getToaster.toastColor"
    :min-width="100"
    :max-width="360"
    class="toaster-container"
  >
    <!-- class="toaster-container" -->
    <!-- :timeout="2000" -->
    <span class="font-weight-black">
      {{ toasterAlert.getToaster.toastMessage }}
    </span>

    <span class="ml-3 add-cursor-pointer" @click="toasterAlert.resetToaster">
      <v-icon color="#ffffff" size="20">
        {{ toasterAlert.getToaster.toastIcon }}
      </v-icon>
    </span>

    <!-- <template v-slot:action="{ attrs }">
      <v-btn
        small
        class="mx-0"
        color="white"
        text
        v-bind="attrs"
        @click="showToaster = false"
      >
        <v-icon color="color"> {{ toasterIcon }} </v-icon>
      </v-btn>
    </template> -->
  </v-snackbar>
</template>

<script>
import { ref } from 'vue'
import {useToasterAlert} from '../store/ToasterAlert'

export default {
  name: "Toaster",

    setup(){
        const showToaster = ref(true);
        const toasterAlert = useToasterAlert();
        
        return { showToaster, toasterAlert }
    }

};
</script>

<style lang="css">
.toaster-container span.font-weight-black{
    font-weight: 500 !important;
}
</style>
