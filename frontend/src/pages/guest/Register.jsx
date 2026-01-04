import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserService from '../services/user.service';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Use the Service Layer
            await UserService.register(formData);
            alert("Registration successful! Please login.");
            navigate('/login');
        } catch (err) {
            console.error(err);
            setError("Registration failed. Email might already be in use.");
        }
    };

    return (
        <div className="container flex-center" style={{ minHeight: '80vh' }}>
            <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
                <h2 className="text-center mb-4">Create Account</h2>

                {error && (
                    <div style={{ color: 'var(--danger)', textAlign: 'center', marginBottom: '1rem', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: 'var(--radius)' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Grid for Name Fields */}
                    <div className="grid grid-2" style={{ marginBottom: '1.25rem', gap: '15px' }}>
                        <div>
                            <label>First Name</label>
                            <input name="name" onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Last Name</label>
                            <input name="surname" onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" name="phoneNumber" onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" onChange={handleChange} required />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                        Register Now
                    </button>
                </form>

                <div className="text-center mt-4">
                    <span className="text-muted">Already have an account? </span>
                    <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                        Login here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;