<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Project Name: </label>
        <input type="text" class="form-control" id="name" required v-model="projects.project_name" name="name" />
      </div>
      <div class="form-group">
        <label for="technology">Technology: </label>
        <select name="technology" id="technology" @change="changeTechnology($event)" class="form-control" >
          <option value="" selected disabled>Please Select</option>
          <option v-for="technology in technologies" :value="technology.value" :key="technology.value" >
            {{ technology.name }}
          </option>
        </select>
      </div>
      <button @click="saveProject" class="mt-3 btn btn-success">Submit</button>
    </div>
    <div v-else>
      <button class="m-3 btn btn-success" @click="newProject">
        Add Project
      </button>
      <router-link to="/projects-list">
        <button class="m-3 btn btn-md btn-primary">
          Projects
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import ProjectsDataService from "../../services/ProjectsDataService";

export default {
  data() {
    return {
      projects: {
        id: null,
        project_name: "",
        technology: null,
      },
      technologies: [
        { value: "node", name: "Node JS" },
        { value: "java", name: "Java" },
        { value: "dotnet", name: ".Net" },
      ],
      submitted: false,
      selectedTechnology: null,
    };
  },
  methods: {
    saveProject() {
      var data = {
        project_name: this.projects.project_name,
        technology: this.selectedTechnology,
      };
      //   console.log(data)
      ProjectsDataService.createProject(data)
        .then((response) => {
          this.projects.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.$toasted.show("Project added successfully!", {
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
    changeTechnology(event) {
      this.projects.technology = event.target.value;
      this.selectedTechnology =
        event.target.options[event.target.options.selectedIndex].text;

      // console.log("value=" + this.project.technology);
      // console.log("data=" + this.selectedTechnology);
    },
    newProject() {
      this.submitted = false;
      this.projects = {};
    },
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