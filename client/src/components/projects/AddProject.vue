<template>
  <div class="submit-form">
    <form @submit.prevent="handleSubmit">

      <div class="form-group">
        <label for="name">Project Name: </label>
        <input type="text" class="form-control" id="name" required v-model="projects.project_name" name="name" :class="{ 'is-invalid': isSubmitted && $v.projects.project_name.$error }" />
        <div v-if="isSubmitted && !$v.projects.project_name.required" class="invalid-feedback" >
          Name field is required
        </div>
      </div>

      <div class="form-group">
        <label for="technology">Technology: </label>
        <select name="technology" id="technology" @change="changeTechnology($event)" class="form-control" :class="{ 'is-invalid': isSubmitted && $v.projects.technology.$error }" >
          <option value="" selected disabled>Please Select</option>
          <option v-for="technology in technologies" :value="technology.value" :key="technology.value" >
            {{ technology.name }}
          </option>
        </select>
        <div v-if="isSubmitted && !$v.projects.technology.required" class="invalid-feedback">
          Technology is required
        </div>
      </div>

      <button class="mt-3 btn btn-success">Submit</button>
    </form>
  </div>
</template>

<script>
import ProjectsDataService from "../../services/ProjectsDataService";

import { required } from "vuelidate/lib/validators";

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
      isSubmitted: false,
      selectedTechnology: null,
    };
  },

  validations: {
    projects: {
      project_name: { required },
      technology: { required }
    }
  },

  methods: {
    handleSubmit() {
      this.isSubmitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.saveProject();
    },
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
          this.isSubmitted = true;
          this.$toasted.show("Project added successfully!", {
            className: ["toast-success"]
          })
          this.$router.push("/projects-list");
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
      this.isSubmitted = false;
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