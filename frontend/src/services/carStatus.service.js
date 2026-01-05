import api from '../api/axiosConfig';

const CarStatusService = {
    getAll: async () => (await api.get('/car-statuses/all')).data
};
export default CarStatusService;