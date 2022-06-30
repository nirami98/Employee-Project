<!-- <template>
  <div class="submit-form">
    <form @submit.prevent="handleSubmit">
    <div v-if="employee && project">
      <div class="form-group">
        <label for="name">Name: </label>
        <input type="text" class="form-control" id="name" required v-model="employee[0].employee_name" name="name" :class="{ 'is-invalid': isSubmitted && $v.employee_name.$error }" />
        <div v-if="isSubmitted && !$v.employee_name.required" class="invalid-feedback">
          Name field is required
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email: </label>
        <input type="email" class="form-control" required v-model="employee[0].email" :class="{ 'is-invalid': isSubmitted && $v.email.$error }" />
        <div v-if="isSubmitted && $v.email.$error" class="invalid-feedback">
          <span v-if="!$v.email.required">Email field is required</span>
          <span v-if="!$v.email.email">Please provide valid email</span>
        </div>
      </div>
      
      <div class="form-group">
        <label for="project">Project: </label>
        <select name="technology" id="technology" @change="changeProject($event)" class="form-control">
          <option value="" selected> {{ project[0].project_name }} </option>
          <option v-for="project in projects" :value="project.project_id" :key="project.project_id">
            {{ project.project_name }}
          </option>
        </select>
      </div>
      
      <button class="mt-3 btn btn-success">Update</button>
  </div>
    </form>
    </div>
</template> -->

<template>
  <div v-if="projects && select">
    <v-app>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field 
          v-model="employee[0].employee_name"
          :rules="nameRules"
          label="Name"
          id="name"
          required>
        </v-text-field>

        <v-text-field
          v-model="employee[0].email"
          :rules="emailRules"
          label="E-mail"
          id="email"
          required>
        </v-text-field>

        <v-select 
          v-model="select[0]" 
          :items="projects"
          item-text="project_name"
          item-value="project_id"
          :rules="[v => !!v || 'Project is required']" 
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
import ProjectsDataService from "@/services/ProjectsDataService";

// import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      employee: null,
      valid: true,
      projects: [],

      // employee_name: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],

      // email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      
      // project_id: null,
      select: null,
    };
  },

/*   validations: {
    employee_name: { required },
      email: { required, email }
  }, */

  methods: {

    validate () {
        // this.$refs.form.validate()
        if(this.$refs.form.validate()) {
          this.showData()
          this.updateEmployee()
        } 
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    /* handleSubmit() {
      this.isSubmitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.updateEmployee();
    }, */

    showData() {
      console.log("name => " + this.employee_name)
      console.log("email => " + this.email)
      console.log("project name => "+this.select[0].project_name)
      console.log("project id => "+this.select[0].project_id)
    },

    getEmployee(employee_uuid) {
      EmployeesDataService.getEmployeeById(employee_uuid)
        .then((response) => {
          // this.employee_name = response.data[0].employee_name;
          // this.email = response.data[0].email;
          // this.project_id = response.data[0].project_id
          this.employee = response.data
          this.getProject(this.employee[0].project_id)

          /* console.log("employee:")
          console.log(this.employee);
          console.log("employee_uuid => "+employee_uuid)
          console.log("employee_name =>"+response.data[0].employee_name)
          console.log("select project details => "+this.select) */
        })
        .catch((e) => {
          console.log(e);
        });
    },
    
    getProject(project_id) {
      ProjectsDataService.getProjectById(project_id)
        .then((response) => {
          // this.project = response.data;
          this.select = response.data;
          // this.selectedProj = response.data;
          // this.selectP[{project_id: response.data[0].project_id, project_name: response.data[0].project_name, project_uuid: response.data[0].project_uuid, technology: response.data[0].technology}]
          // this.selectedProj = this.selectP;
          // console.log("selected project")
          // console.log(this.selectP);
          // console.log("project_name =>"+this.select[0].project_name)
          // return (response.data)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    
    /* changeProject(event) {
      this.employee.project = event.target.value;
      this.employee[0].project_id = event.target.value;
    }, */
    retrieveProjects() {
      ProjectsDataService.getAllProjects()
        .then((response) => {
          this.projects = response.data;
          // console.log(this.projects);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateEmployee() {
      var data = {
        employee_name: this.employee[0].employee_name,
        email: this.employee[0].email,
        project_id: this.select[0].project_id
      };
      // this.employee[0].project_id = this.select[0].project_id
      EmployeesDataService.updateEmployee(this.employee[0].employee_uuid, data)
        .then((response) => {
          console.log(response.data);
          // this.isSubmitted = true;
          // this.message = "The employee was updated successfully!";
          // this.getEmployee(this.employee[0].employee_uuid)
          this.$toasted.show("Employee updated successfully!", {
            className: ["toast-success"]
          })
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
          this.$toasted.show("Error while updating employee!", {
            className: ["toast-error"]
          })
        });
    },
  },
  mounted() {
    this.getEmployee(this.$route.params.employee_uuid);
    this.retrieveProjects()
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}

.toast-success{
  background-color: lightgreen !important;
  border: 1px;
  border-color: darkgreen !important;
  color: darkgreen !important;
}

.toast-error{
  background-color: lightcoral !important;
  border: 1px;
  border-color: darkred !important;
  color: darkred !important;
}
</style>