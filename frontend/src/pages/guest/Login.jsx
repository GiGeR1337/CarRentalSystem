import {useState} from 'react';
import useAuth from '../../hooks/useAuth.js';
import AuthService from '../../services/auth.service.js';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';

const Login = () => {
    const [form, setForm] = useState({email: '', password: ''});
    const {login} = useAuth();
    const {t} = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await AuthService.login(form.email, form.password);
            toast.success(t('auth.welcome'));
            login(data.token);
        } catch (err) {
            toast.error(t('auth.error_login'));
        }
    };

    return (
        <div className="container flex-center min-h-60vh">
            <div className="card auth-card">
                <h2 className="text-center mb-4">{t('auth.welcome')}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>{t('auth.email')}</label>
                        <input type="email" onChange={e => setForm({...form, email: e.target.value})} required/>
                    </div>

                    <div className="form-group">
                        <label>{t('auth.password')}</label>
                        <input type="password" onChange={e => setForm({...form, password: e.target.value})} required/>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-2">{t('auth.signIn')}</button>
                </form>
            </div>
        </div>
    );
};
export default Login;