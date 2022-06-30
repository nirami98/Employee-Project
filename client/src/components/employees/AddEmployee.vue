<!-- <template>
  <div class="submit-form">
    <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name: </label>
          <input
            type="text"
            class="form-control"
            id="name"
            required
            v-model="employee.employee_name"
            name="name"
            :class="{
              'is-invalid': isSubmitted && $v.employee.employee_name.$error,
            }"
          />
          <div
            v-if="isSubmitted && !$v.employee.employee_name.required"
            class="invalid-feedback"
<<<<<<< HEAD
          >
            Name field is required
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email: </label>
          <input
            type="email"
            class="form-control"
            required
            v-model="employee.email"
            :class="{ 'is-invalid': isSubmitted && $v.employee.email.$error }"
          />
          <div
            v-if="isSubmitted && $v.employee.email.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.employee.email.required"
              >Email field is required</span
            >
            <span v-if="!$v.employee.email.email"
              >Please provide valid email</span
            >
          </div>
        </div>

        <div class="form-group">
          <label for="project">Project: </label>
          <select
            name="technology"
            id="technology"
            @change="changeProject($event)"
            class="form-control"
          >
=======
          >
            Name field is required
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email: </label>
          <input
            type="email"
            class="form-control"
            required
            v-model="employee.email"
            :class="{ 'is-invalid': isSubmitted && $v.employee.email.$error }"
          />
          <div
            v-if="isSubmitted && $v.employee.email.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.employee.email.required"
              >Email field is required</span
            >
            <span v-if="!$v.employee.email.email"
              >Please provide valid email</span
            >
          </div>
        </div>

        <div class="form-group">
          <label for="project">Project: </label>
          <select
            name="technology"
            id="technology"
            @change="changeProject($event)"
            class="form-control"
          >
>>>>>>> 006d36e4e922ffe08516319dcf7f9c20df57dfc4
            <option value="" selected disabled>Please Select</option>
            <option
              v-for="project in projects"
              :value="project.project_id"
              :key="project.project_id"
            >
              {{ project.project_name }}
            </option>
          </select>
        </div>
        <button class="mt-3 btn btn-success">Submit</button>
    </form>
<<<<<<< HEAD
  </div>
</template> -->

<template>
<div v-if="projects">
  <v-app>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field 
        v-model="employee_name" 
        :rules="nameRules" 
        label="Name" 
        id="name"
        required>
      </v-text-field>

      <v-text-field 
        v-model="email" 
        :rules="emailRules" 
        label="E-mail" 
        id="email"
        required>
      </v-text-field>

      <v-select 
        v-model="select" 
        :items="projects"
        item-text="project_name"
        :rules="[v => !!v || 'Project is required']" label="Projects" 
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
=======
>>>>>>> 006d36e4e922ffe08516319dcf7f9c20df57dfc4
  </div>
</template>

<script>
import EmployeesDataService from "../../services/EmployeesDataService";
import ProjectsDataService from "../../services/ProjectsDataService";

<<<<<<< HEAD
// import { required, email } from "vuelidate/lib/validators";
=======
import { required, email } from "vuelidate/lib/validators";
>>>>>>> 006d36e4e922ffe08516319dcf7f9c20df57dfc4

export default {
  data() {
    return {
      /* employee: {
        id: null,
        employee_name: "",
        email: "",
        project_id: "",
<<<<<<< HEAD
      }, */
      // isSubmitted: false,

      projects: [],
      // selectedProject: null,
      valid: true,
      id: null,

      employee_name: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],

      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],

      select: null,
    };
  },

  /* validations: {
=======
      },
      projects: [],
      isSubmitted: false,
      selectedProject: null,
    };
  },

  validations: {
>>>>>>> 006d36e4e922ffe08516319dcf7f9c20df57dfc4
    employee: {
      employee_name: {
        required,
      },
      email: {
        required,
        email,
      },
      project_id: {
        required,
      },
    },
<<<<<<< HEAD
  }, */

  methods: {
    validate () {
        // this.$refs.form.validate()
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
    /* handleSubmit() {
=======
  },

  methods: {
    handleSubmit() {
>>>>>>> 006d36e4e922ffe08516319dcf7f9c20df57dfc4
      this.isSubmitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.saveEmployee();
<<<<<<< HEAD
    }, */
=======
    },
>>>>>>> 006d36e4e922ffe08516319dcf7f9c20df57dfc4
    saveEmployee() {
      var data = {
        employee_name: this.employee_name,
        email: this.email,
        project_id: this.select.project_id
        // employee_name: this.employee.employee_name,
        // email: this.employee.email,
        // project_id: this.selectedProject,
      };
      EmployeesDataService.createEmployee(data)
        .then((response) => {
          this.id = response.data.id;
          console.log(response.data);
          this.isSubmitted = true;
          this.$toasted.show("Employee added successfully!", {
            className: ["toast-success"],
          });
<<<<<<< HEAD
          this.reset();
=======
>>>>>>> 006d36e4e922ffe08516319dcf7f9c20df57dfc4
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
          this.$toasted.show("Error while adding employee!", {
            className: ["toast-error"],
          });
        });
    },

<<<<<<< HEAD
   /*  changeProject(event) {
      this.employee.project = event.target.value;
      this.employee.project_id = event.target.key;
=======
    changeProject(event) {
      // this.employee.project = event.target.value;
      // this.employee.project_id = event.target.key;
>>>>>>> 006d36e4e922ffe08516319dcf7f9c20df57dfc4
      this.selectedProject = event.target.value;
      this.selectedProject = event.target.options[event.target.options.selectedIndex].text;

      console.log("value=" + this.project.technology);
      console.log("data=" + this.selectedTechnology);
    },

    newEmployee() {
      this.submitted = false;
      this.employee = {};
    },
<<<<<<< HEAD
 */
=======

>>>>>>> 006d36e4e922ffe08516319dcf7f9c20df57dfc4
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