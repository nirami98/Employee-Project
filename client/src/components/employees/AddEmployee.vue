<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name: </label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="employee.employee_name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="email">Email: </label>
        <input
          type="email"
          class="form-control"
          required
          v-model="employee.email"
        />
      </div>

      <div class="form-group">
        <label for="project">Project: </label>
        <select
          name="technology"
          id="technology"
          @change="changeProject($event)"
          class="form-control"
        >
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

      <button @click="saveEmployee" class="mt-3 btn btn-success">Submit</button>
    </div>
    <div v-else>
      <button class="m-3 btn btn-success" @click="newEmployee">
        Add employee
      </button>
      <router-link to="/">
        <button class="m-3 btn btn-md btn-primary">
          Home
        </button>
      </router-link>
    </div>
    <!-- <div> <ToastNotification/></div> -->
  </div>
</template>

<script>
import EmployeesDataService from "../../services/EmployeesDataService";
import ProjectsDataService from "../../services/ProjectsDataService";
// import ToastNotification from "../ui/ToastNotification.vue"


export default {
  components: {
    // ToastNotification
  },
  data() {
    return {
      employee: {
        id: null,
        employee_name: "",
        email: "",
        project_id: null,
      },
      projects: [],
      submitted: false,
      selectedProject: null,
    };
  },
  methods: {
    saveEmployee() {
      var data = {
        employee_name: this.employee.employee_name,
        email: this.employee.email,
        project_id: this.selectedProject,
      };
      EmployeesDataService.createEmployee(data)
        .then((response) => {
          this.employee.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.$toasted.show("Employee added successfully!", {
            className: ["toast-success"]
          })
        })
        .catch((e) => {
          console.log(e);
          this.$toasted.show("Error while adding employee!", {
            className: ["toast-error"]
          })
        });
    },
    changeProject(event) {
      // this.employee.project = event.target.value;
      // this.employee.project_id = event.target.key;
      this.selectedProject = event.target.value;
      // this.selectedProject = event.target.options[event.target.options.selectedIndex].text;

      // console.log("value=" + this.project.technology);
      // console.log("data=" + this.selectedTechnology);
    },
    newEmployee() {
      this.submitted = false;
      this.employee = {};
    },
    retrieveProjects() {
      ProjectsDataService.getAllProjects()
        .then((response) => {
          this.projects = response.data;
          console.log(response.data);
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