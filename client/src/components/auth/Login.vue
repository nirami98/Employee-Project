<template>
  <v-app>
    <v-form ref="form" v-model="valid" lazy-validation>

      <v-text-field 
        v-model="email" 
        :rules="rules.emailRules" 
        label="E-mail" 
        id="email"
        required>
      </v-text-field>

      <v-text-field 
        v-model="password"
        :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="rules.passwordRules"
        :type="visible ? 'text' : 'password'"
        label="Password"
        id="password"
        counter
        @click:append="visible = !visible"
        required>
      </v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Submit
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset">
        Reset Form
      </v-btn>

      <v-btn color="warning" @click="resetValidation">
        Reset Validation
      </v-btn>
    </v-form>
  </v-app>
</template>

<script>
import EmployeesDataService from "../../services/EmployeesDataService";

export default {
  data() {
    return {
      valid: true,
      email: '',
      password: '',
      visible: false,
      msg: '',

      rules: {
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length >= 8 || 'Min 8 characters required',
        ],
      },
    };
  },

  methods: {
    validate () {
        if(this.$refs.form.validate()) {
          this.employeeLogin()
        } 
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },

    employeeLogin() {
      var credentials = {
        email: this.email,
        password: this.password
      };
      // console.log(credentials)
      EmployeesDataService.login(credentials)
        .then((response) => {
          this.msg = response.msg;
          console.log(response.data.msg);
          console.log(response.data.token);
          var token = response.data.token;
          this.$store.dispatch('login', { token });
          this.$toasted.show("Login successful", {
            className: ["toast-success"],
          });
          this.reset();
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
          this.$toasted.show("Error while registration!", {
            className: ["toast-error"],
          });
        });
    },
  },

  mounted() {

  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}

.toast-success {
  background-color: lightgreen !important;
  border: 1px;
  border-color: darkgreen !important;
  color: darkgreen !important;
}

.toast-error {
  background-color: lightcoral !important;
  border: 1px;
  border-color: darkred !important;
  color: darkred !important;
}
</style>