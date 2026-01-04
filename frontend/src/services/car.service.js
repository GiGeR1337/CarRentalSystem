import api from '../api/axiosConfig';

const CarService = {
    getAll: async () => (await api.get('/cars/all')).data,
    getById: async (id) => (await api.get(`/cars/id/${id}`)).data,
    create: async (data) => (await api.post('/cars/create', data)).data,
    update: async (id, data) => (await api.put(`/cars/update/${id}`, data)).data,
    delete: async (id) => (await api.delete(`/cars/delete/${id}`)).data,
};
export default CarService;