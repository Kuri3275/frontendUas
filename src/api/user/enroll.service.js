import api from "../axios";

const enrollService = {
  // POST ke /api/enroll/{id} sesuai parameter di Controller kamu
  async enrollCourse(courseId) {
    return await api.post(`/enroll/${courseId}`);
  },

  // Mengambil daftar course yang sudah di-enroll user ini
  async getMyCourses() {
    return await api.get('/my-courses');
  }
};

export default enrollService;