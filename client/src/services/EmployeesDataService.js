import http from "../http-common";

class EmployeesDataService {
    getAllEmployees() {
        return http.get("/employees")
    }

    getEmployeeById(employee_uuid) {
        return http.get(`/employees/${employee_uuid}`)
    }

    createEmployee(data) {
        return http.post("/employees", data)
    }

    updateEmployee(employee_uuid, data) {
        return http.put(`/employees/${employee_uuid}`, data)
    }

    deleteEmployee(employee_uuid) {
        return http.delete(`/employees/${employee_uuid}`)
    }

    getEmployeesByProject(project_id) {
        return http.get(`/employees/viewModal/${project_id}`)
    }
}

export default new EmployeesDataService()