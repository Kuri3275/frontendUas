import api from "../axios";

const materialCategoryService = {
  // Mengambil semua kategori (public/admin)
  getAll: () => api.get("/admin/material-categories"), 
  
  // Method admin (pastikan header Bearer Token sudah ada di axios config)
  create: (data) => api.post("/admin/material-categories", data),
  update: (id, data) => api.put(`/admin/material-categories/${id}`, data),
  delete: (id) => api.delete(`/admin/material-categories/${id}`),
};

export default materialCategoryService;