import api from "../axios";

export default {
  // Mengambil data user yang sedang login (Nama, Email, dll)
  getProfile() {
    return api.get("/user"); 
  },
  
  // Mengupdate data profil
  updateProfile(data) {
    return api.put("/user/update", data);
  }
};