import api from "../axios";

const courseCategoryService = {
  getCategories: async (params) => {
    try {
      const res = await api.get("/admin/course-categories", { params });
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  create: async (data) => {
    try {
      const res = await api.post("/admin/course-categories", data);
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  update: async (id, data) => {
    try {
      const res = await api.put(`/admin/course-categories/${id}`, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      const res = await api.delete(`/admin/course-categories/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  },
};

export default courseCategoryService;
