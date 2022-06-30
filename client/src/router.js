import Vue from "vue";
import Router from "vue-router";
// import {createWebHistory, createRouter} from "vue-router"
Vue.use(Router);

// import AddProject from "./components/projects/AddProject.vue";

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/employees-list",
      name: "employees",
      component: () => import("./components/employees/EmployeesList.vue")
    },
    {
      path: "/projects-list",
      name: "projects",
      component: () => import("./components/projects/ProjectsList.vue")
    },
    {
      path: "/add-project",
      name: "addProject",
      component: () => import("./components/projects/AddProject.vue")
    },
    {
      path: "/add-employees",
      name: "addEmployees",
      component: () => import("./components/employees/AddEmployee.vue")
    },
    {
      path: "/edit-employees/:employee_uuid",
      name: "editEmployees",
      component: () => import("./components/employees/EditEmployee.vue")
    },
    {
      path: "/page",
      name: "page",
      component: () => import("./components/employees/Page.vue")
    }
  ]
});