
<template>
  <v-dialog v-model="dialog" :max-width="options.width" :style="{ zIndex: options.zIndex }" @keydown.esc="cancel">
    <v-card>
      <v-toolbar dark :color="options.color" dense flat>
        <v-toolbar-title class="black--text">title</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pa-4">message</v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click.native="agree">Yes</v-btn>
        <v-btn color="grey" text @click.native="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: "ConfirmDlg",
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      message: null,
      title: null,
      options: {
        color: "grey lighten-3",
        width: 400,
        zIndex: 200,
        noconfirm: false,
      },
    };
  },

  methods: {
    open() {
      this.dialog = true;
      // this.title = title;
      // this.message = message;
      // this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    },
  },
};

// import { defineComponent, reactive, toRefs } from "@vue/composition-api";
/* export default defineComponent({
  setup() {
    const state = reactive({
      dialog: false,
      resolve: null,
      reject: null,
      message: true,
      title: null,
      options: {
        color: "primary",
        width: 290,
        zIndex: 200
      }
    });
    const open = () => {
      state.dialog = true;
      // state.title = title;
      // state.message = message;
      // state.options = Object.assign(state.options, options);
      return new Promise((resolve, reject) => {
        state.resolve = resolve;
        state.reject = reject;
      });
    };

    const agree = () => {
      console.log("confirm");
      state.resolve(true);
      state.dialog = false;
    };

    const cancel = () => {
      console.log("cancel");
      state.resolve(false);
      state.dialog = false;
    };

    return {
      ...toRefs(state),
      open,
      agree,
      cancel
    };
  }
}); */


/**
 * Vuetify Confirm Dialog component
 *
 * Insert component where you want to use it:
 * <confirm ref="confirm"></confirm>
 *
 * Call it:
 * this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' }).then((confirm) => {})
 * Or use await:
 * if (await this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' })) {
 *   // yes
 * }
 * else {
 *   // cancel
 * }
 *
 * Alternatively you can place it in main App component and access it globally via this.$root.$confirm
 * <template>
 *   <v-app>
 *     ...
 *     <confirm ref="confirm"></confirm>
 *   </v-app>
 * </template>
 *
 * mounted() {
 *   this.$root.$confirm = this.$refs.confirm.open
 * }
 */
/* export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    options: {
      color: 'primary',
      width: 290,
      zIndex: 200
    }
  }),
  methods: {
    open(title, message, options) {
      this.dialog = true
      this.title = title
      this.message = message
      this.options = Object.assign(this.options, options)
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree() {
      this.resolve(true)
      this.dialog = false
    },
    cancel() {
      this.resolve(false)
      this.dialog = false
    }
  }
} */
</script>