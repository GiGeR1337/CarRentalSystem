import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import UserService from '../../services/user.service.js';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await UserService.register(formData);
            toast.success(t('auth.success_register'));
            navigate('/login');
        } catch (err) {
            console.error(err);
            toast.error(t('auth.error_register'));
        }
    };

    return (
        <div className="container flex-center min-h-80vh">
            <div className="card w-100 max-w-500px">
                <h2 className="text-center mb-4">{t('auth.createAccount')}</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>{t('auth.firstName')}</label>
                        <input name="name" onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label>{t('auth.lastName')}</label>
                        <input name="surname" onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label>{t('auth.email')}</label>
                        <input type="email" name="email" onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label>{t('auth.phone')}</label>
                        <input type="tel" name="phoneNumber" onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label>{t('auth.password')}</label>
                        <input type="password" name="password" onChange={handleChange} required/>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-2">
                        {t('auth.registerNow')}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <span className="text-muted">{t('auth.haveAccount')} </span>
                    <Link to="/login" className="fw-bold text-primary">
                        {t('auth.loginHere')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;