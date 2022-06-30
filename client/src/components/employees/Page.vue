<template>
  <v-app>
    <div>
      <v-btn icon color="red" @click="openConfirm"> Click here </v-btn>
      <!-- <confirm ref="veeConfirmRef"></confirm> -->
      <Confirm ref="veeConfirmRef" />
    </div>
  </v-app>
</template>

<script>
// import { onMounted } from "@vue/composition-api";
import Confirm from "../ui/Confirm.vue";

export default {
  components: {
    Confirm,
  },
  methods: {
    openConfirm() {
      this.$refs.veeConfirmRef.open();
    },
  },
};
</script>