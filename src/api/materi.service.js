import api from "./axios";

const materialService = {
  getAll: () => api.get("/admin/materials"),
  create: (data) => api.post("/admin/materials", data),
  update: (id, data) => api.put(`/admin/materials/${id}`, data),
  delete: (id) => api.delete(`/admin/materials/${id}`)
};

export default materialService;
