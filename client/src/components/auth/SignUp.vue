<template>
<div v-if="projects">
  <v-app>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field 
        v-model="employee_name" 
        :rules="rules.nameRules" 
        label="Name" 
        id="name"
        required>
      </v-text-field>

      <v-text-field 
        v-model="email" 
        :rules="rules.emailRules" 
        label="E-mail" 
        id="email"
        required>
      </v-text-field>

      <v-text-field
        v-model="phone_number"
        type="number"
        :rules="rules.phoneRules"
        label="Phone Number"
        id="phone"
        :counter="10"
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

      <v-text-field 
        v-model="confirm_password"
        :append-icon="confirmVisible ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="rules.confirmPasswordRules"
        :type="confirmVisible ? 'text' : 'password'"
        label="Confirm Password"
        id="confirmPassword"
        counter
        @click:append="confirmVisible = !confirmVisible"
        required>
      </v-text-field>

      <v-select 
        v-model="select" 
        :items="projects"
        item-text="project_name"
        :rules="rules.selectRules" 
        label="Projects" 
        return-object
        required>
      </v-select>

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
  </div>
</template>

<script>
import EmployeesDataService from "../../services/EmployeesDataService";
import ProjectsDataService from "../../services/ProjectsDataService";

export default {
  data() {
    return {
      projects: [],
      valid: true,
      id: null,
      select: null,

      employee_name: '',
      email: '',
      phone_number: '',
      password: '',
      confirm_password: '',

      visible: false,
      confirmVisible: false,

      rules: {
        nameRules: [
          v => !!v || 'Name is required'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        phoneRules: [
          v => !!v || 'Phone Number is required',
          v => (v && v.length == 10) || 'Number must be 10 characters',
        ],
        selectRules: [
          v => !!v || 'Project is required',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length >= 8 || 'Min 8 characters required',
        ],
        confirmPasswordRules: [
          v => !!v || 'Confirm Password is required',
          v => v.length >= 8 || 'Min 8 characters required',
          () => (this.password === this.confirm_password) || 'Passwords must match'
        ],
      },
    };
  },

  methods: {
    validate () {
        if(this.$refs.form.validate()) {
          this.saveEmployee()
        } 
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },

      showData() {
        console.log("name => " + this.employee_name)
        console.log("email => " + this.email)
        console.log("selected project id => " + this.select.project_id)
        console.log("selected project name => " + this.select.project_name)
      },

    saveEmployee() {
      var data = {
        employee_name: this.employee_name,
        email: this.email,
        project_id: this.select.project_id,
        phone_number: this.phone_number,
        password: this.password
      };
      EmployeesDataService.createEmployee(data)
        .then((response) => {
          this.id = response.data.id;
          console.log(response.data);
          this.isSubmitted = true;
          this.$toasted.show("Registration successfully!", {
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

    retrieveProjects() {
      ProjectsDataService.getAllProjects()
        .then((response) => {
          this.projects = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.retrieveProjects();
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