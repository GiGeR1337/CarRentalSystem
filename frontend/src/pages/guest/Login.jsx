import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import AuthService from '../services/auth.service';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await AuthService.login(form.email, form.password);
            login(data.token);
        } catch (err) { setError('Invalid email or password.'); }
    };

    return (
        <div className="container flex-center" style={{ minHeight: '60vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Welcome Back</h2>
                {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" onChange={e => setForm({...form, email: e.target.value})} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={e => setForm({...form, password: e.target.value})} required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign In</button>
                </form>
            </div>
        </div>
    );
};
export default Login;