import http from "../http-common";

class ProjectsDataService {
    getAllProjects() {
        return http.get("/projects")
    }

    getProjectById(project_id) {
        return http.get(`/projects/${project_id}`)
    }

    createProject(data) {
        return http.post("/projects", data)
    }

    updateProject(id, data) {
        return http.put(`/projects/${id}`, data)
    }

    deleteProject(id) {
        return http.delete(`/projects/${id}`)
    }
}

export default new ProjectsDataService()