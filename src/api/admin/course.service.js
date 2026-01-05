import api from "../axios";

const courseService = {
  getCourses: (params) => api.get("/admin/courses", { params }),

  getSelect: () => api.get("/admin/courses/select"),

  // Cukup terima formData langsung dari komponen
  create: async (formData) => {
    const res = await api.post("/admin/courses", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  update: async (id, formData) => {
    // Gunakan _method=PUT di URL atau append ke formData
    const res = await api.post(`/admin/courses/${id}?_method=PUT`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  delete: (id) => api.delete(`/admin/courses/${id}`),
};

export default courseService;