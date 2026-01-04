import api from '../api/axiosConfig';

const RentalService = {
    getMyHistory: async () => (await api.get('/rentals/my-history')).data,
    rentCar: async (data) => (await api.post('/rentals', data)).data,
    updateMyRental: async (id, data) => (await api.put(`/rentals/my-update/${id}`, data)).data,
    cancelRental: async (id) => (await api.put(`/rentals/cancel/${id}`)).data,
};
export default RentalService;