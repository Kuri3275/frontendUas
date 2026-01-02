import api from "../axios";

export default {
  async getAll() {
    const res = await api.get("/quiz");

    // Laravel pagination → ambil array-nya
    return res.data?.data?.data ?? [];
  },

  async getById(id) {
    const res = await api.get(`/quiz/${id}`);
    return res.data?.data ?? null;
  }
};
