import api from '../axios'; // Pastikan ini mengarah ke file konfigurasi axios kamu

const getAllMaterials = () => {
    return api.get('/materials');
};

// TAMBAHKAN INI:
const getMaterialById = (id) => {
    return api.get(`/materials/${id}`);
};


const materiService = {
    getAllMaterials,
    getMaterialById, // Masukkan ke sini
};

export default materiService;