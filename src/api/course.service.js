import api from "./axios";

const courseService = {
  getAll: () => api.get("/admin/courses"),
  getSelect: () => api.get("/admin/courses/select"),
  create: (data) => api.post("/admin/courses", data),
  update: (id, data) => api.put(`/admin/courses/${id}`, data),
  delete: (id) => api.delete(`/admin/courses/${id}`)
};

export default courseService;
