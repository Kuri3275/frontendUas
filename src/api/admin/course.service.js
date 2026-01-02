import api from "../axios";

const courseService = {
  getCourses: () => api.get("/admin/courses"),
  getSelect: async () => {
  const res = await api.get("/admin/courses/select");
  return res.data.data;
},

  create: (data) => api.post("/admin/courses", data),
  update: (id, data) => api.put(`/admin/courses/${id}`, data),
  delete: (id) => api.delete(`/admin/courses/${id}`),
};

export default courseService;
