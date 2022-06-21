<template>
  <teleport to="body">
    <div @click="$emit('close')" class="backdrop"></div>
    <transition name="dialog">
      <dialog open>
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <label for="name"><strong> Name: </strong> &nbsp;{{project[0].project_name}}</label>
          <br /><br />
          <label for="technology"><strong> Technology: </strong> &nbsp;{{project[0].technology}}</label>
          <br><br>
          <label for="employees"><strong> Employees: </strong> 
            <p v-for="(employee, index) in employees" :key="index">
              {{employee.employee_name}}
              
            </p>
          </label>
        </section>
        <menu>
          <slot name="actions">
            <button @click="$emit('close')">Close</button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
import ProjectsDataService from '../../services/ProjectsDataService';
import EmployeesDataService from '../../services/EmployeesDataService';

export default {
  data() {
    return {
      id: this.$props.project_id,
      project: null,
      employees: []
    };
  },

  props: {
    title: {
      type: String,
      required: false,
    },
    project_id: {
      type: Number,
      required: true
    }
  },
  emits: ['close'],
  methods: {
    getProject(id) {
      ProjectsDataService.getProjectById(id)
        .then((response) => {
          this.project = response.data;
          console.log(id)
          console.log(this.project)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getEmployeesByProject(id) {
      EmployeesDataService.getEmployeesByProject(id)
        .then((response) => {
          this.employees = response.data;
          console.log(this.employees)
        })
    }
  },
  mounted() {
    this.getProject(this.id);
    this.getEmployeesByProject(this.id)
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: #3a0061;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
