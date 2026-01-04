import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { t } = useTranslation();

    return (
        <nav className="border-bottom bg-card py-3 mb-4">
            <div className="container flex-between">

                <div className="flex-align-center gap-3">
                    <Link to="/" className="text-xl font-extrabold text-primary">
                        ⚡CarRental
                    </Link>
                </div>

                <div className="flex gap-4">
                    <Link to="/" className="text-main font-medium">
                        {t('navbar.home')}
                    </Link>

                    {user && (
                        <Link to="/my-rentals" className="text-main font-medium">
                            {t('navbar.myRentals')}
                        </Link>
                    )}

                    {user?.role === 'ROLE_ADMIN' && (
                        <Link to="/admin" className="text-primary font-semibold">
                            {t('navbar.dashboard')}
                        </Link>
                    )}
                </div>

                <div className="flex-center gap-2">
                    {user ? (
                        <>
                            <span className="text-muted mr-2">{user.email}</span>
                            <button onClick={logout} className="btn btn-outline btn-sm">
                                {t('navbar.logout')}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline btn-sm">
                                {t('navbar.login')}
                            </Link>
                            <Link to="/register" className="btn btn-primary btn-sm">
                                {t('navbar.register')}
                            </Link>
                        </>
                    )}

                    <LanguageSwitcher />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;