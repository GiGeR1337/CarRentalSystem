import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 mb-4">
            <Link className="navbar-brand" to="/">🚗 CarRental</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>

                    {user && (
                        <li className="nav-item"><Link className="nav-link" to="/my-rentals">My Rentals</Link></li>
                    )}

                    {user && user.role === 'ROLE_ADMIN' && (
                        <li className="nav-item"><Link className="nav-link text-warning" to="/admin">Admin Dashboard</Link></li>
                    )}
                </ul>

                <div className="d-flex gap-2">
                    {user ? (
                        <>
                            <span className="navbar-text text-white me-3">Hi, {user.email}</span>
                            <button onClick={logout} className="btn btn-outline-danger btn-sm">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline-light btn-sm">Login</Link>
                            <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;