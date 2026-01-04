import api from '../api/axiosConfig';

const LocationService = {
    getAll: async () => (await api.get('/locations/all')).data,
    getById: async (id) => (await api.get(`/locations/${id}`)).data,
    create: async (data) => (await api.post('/locations/create', data)).data,
    update: async (id, data) => (await api.put(`/locations/update/${id}`, data)).data,
    delete: async (id) => (await api.delete(`/locations/delete/${id}`)).data,
};
export default LocationService;