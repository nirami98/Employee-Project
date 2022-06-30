<template>
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
</template>

<script>
import EmployeesDataService from "../../services/EmployeesDataService";
import ProjectsDataService from "@/services/ProjectsDataService";

import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      employee: null,
      project: null,
      projects: [],
      selectedProject: null,
      isSubmitted: false
    };
  },

  validations: {
    employee_name: { required },
      email: { required, email }
    // employees: {
      
    // }
  },

  methods: {
    handleSubmit() {
      this.isSubmitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.updateEmployee();
    },

    getEmployee(employee_uuid) {
      EmployeesDataService.getEmployeeById(employee_uuid)
        .then((response) => {
          this.employee = response.data;
          this.selectedProject = this.getProject(this.employee[0].project_id)
          console.log(this.employee);
          console.log("employee_uuid => "+employee_uuid)
          console.log("employee_name =>"+this.employee[0].employee_name)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    
    getProject(project_id) {
      ProjectsDataService.getProjectById(project_id)
        .then((response) => {
          this.project = response.data;
          console.log(this.employee);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    
    changeProject(event) {
      this.employee.project = event.target.value;
      this.employee[0].project_id = event.target.value;
    },
    retrieveProjects() {
      ProjectsDataService.getAllProjects()
        .then((response) => {
          this.projects = response.data;
          console.log(this.projects);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateEmployee() {
      EmployeesDataService.updateEmployee(this.employee[0].employee_uuid, this.employee[0])
        .then((response) => {
          console.log(response.data);
          this.isSubmitted = true;
          this.message = "The employee was updated successfully!";
          this.getEmployee(this.employee[0].employee_uuid)
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