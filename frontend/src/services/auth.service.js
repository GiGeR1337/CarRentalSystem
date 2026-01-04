import api from '../api/axiosConfig';

const AuthService = {
    login: async (email, password) => {
        const response = await api.post('/auth/login', {email, password});
        return response.data;
    }
};
export default AuthService;