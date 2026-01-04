import api from '../api/axiosConfig';

const UserService = {
    getAll: async () => (await api.get('/users/all')).data,
    delete: async (id) => (await api.delete(`/users/delete/${id}`)).data,
    register: async (data) => (await api.post('/users/register', data)).data,
};
export default UserService;