<template>
  <div class="list row">
    <div class="col-md-12">
      <h2>Employees List</h2>
      <router-link to="/add-employees">
        <button class="mb-3 btn btn-md btn-primary">
          Add User
        </button>
      </router-link>

      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Project</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee, index) in employees" :key="index">
            <td>{{employee.employee_name}}</td>
            <td>{{employee.email}}</td>
            <td>{{employee.project_name}}</td>
            <td class="text-end">
              <!-- <a type="button" class="btn btn-light btn-small">
                <i class="bi bi-eye"></i> 
                View
              </a> -->
              <router-link :to="'/edit-employees/'+employee.employee_uuid">
              <a type="button" class="btn btn-light btn-small" >
                <i class="bi bi-pencil"></i>
                Edit
              </a>
              </router-link>
              &nbsp;
              <a type="button" class="btn btn-light btn-small" @click="deleteEmployee(employee.employee_uuid)"><i class="bi bi-person-x"></i> Delete</a>
              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import EmployeesDataService from "../../services/EmployeesDataService";

export default {
  data() {
    return {
      employees: []
    };
  },
  methods: {
    retrieveEmployees() {
      EmployeesDataService.getAllEmployees()
        .then((response) => {
          this.employees = response.data;
          console.log(response.data);
        }).catch((e) => {
          console.log(e);
        });
    },

    deleteEmployee(employee_uuid) {
      EmployeesDataService.deleteEmployee(employee_uuid)
      .then(response => {
        console.log(response.data);
        this.retrieveEmployees();
        this.$toasted.show("Employee deleted successfully!", {
            className: ["toast-success"]
          })
      }).catch((e) => {
        console.log(e);
        this.$toasted.show("Error while deleting employee!", {
            className: ["toast-error"]
          })
      });
    },

  },
  mounted() {
    this.retrieveEmployees();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
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