<template>
  <div class="list row">
    <div class="col-md-12">
      <h2>Projects List</h2>
            <!-- <button class="mb-3 btn btn-md btn-primary" @click="showModal">
            Add Project
            </button>
            <BaseDialog v-show="isModalVisible" title="Add Project" @submit="closeModal"/> -->
            
      <router-link to="/add-project">
        <button class="mb-3 btn btn-md btn-primary">
          Add Project
        </button>
      </router-link>
        
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Project Name</th>
            <th scope="col">Technology</th>
            <!-- <th scope="col">Members</th> -->
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(project, index) in projects" :key="index">
            <td>{{ project.project_name }}</td>
            <td>{{ project.technology }}</td>
            <td class="text-end">
              <a type="button" class="btn btn-light btn-small" @click="showModal(project.project_id)">
                <i class="bi bi-eye"></i> 
                View
              </a>
              <!-- <a type="button" class="btn btn-light btn-small"
                ><i class="bi bi-pencil"></i> Edit</a
              >
              <a type="button" class="btn btn-light btn-small"
                ><i class="bi bi-person-x"></i> Delete</a
              > -->
              <!-- <a href="/viewuser/{{this.id}}" type="button" class="btn btn-light btn-small"><i class="bi bi-eye"></i> View</a>
              <a href="/edituser/{{this.id}}" type="button" class="btn btn-light btn-small"><i class="bi bi-pencil"></i>
                Edit</a>
              <a href="/{{this.id}}" type="button" class="btn btn-light btn-small"><i class="bi bi-person-x"></i> Delete</a> -->
            </td>
          </tr>
              <BaseDialog v-if="isModalVisible" title="View Project" @close="closeModal" :project_id="currentProject" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ProjectsDataService from "../../services/ProjectsDataService"
import BaseDialog from "../ui/BaseDialog.vue";

export default {
  components: {
      BaseDialog
  },
  data() {''
    return {
      projects: [],
      currentProject: null,
      currentIndex: -1,
      title: "",
      isModalVisible: false,
    };
  },
  methods: {
    showModal(project_id) {
      this.isModalVisible = true;
      this.currentProject = project_id
      // console.log(project_id)
    },
    closeModal() {
      this.isModalVisible = false;
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

    refreshList() {
      this.retrieveProjects();
      this.currentProject = null;
      this.currentIndex = -1;
    },
  },
  mounted() {
    this.retrieveProjects();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
#modal {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>