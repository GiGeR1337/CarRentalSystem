import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
    const { t } = useTranslation();

    const Module = ({ title, desc, link, type }) => (
        <Link
            to={link}
            className={`card d-block text-center border-${type}`}
        >
            <h3 className={`text-xl text-${type}`}>{title}</h3>
            <p className="text-muted mb-4">{desc}</p>
            <span className="btn btn-outline w-100">{t('admin.dashboard.btn_manage')}</span>
        </Link>
    );

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">{t('admin.dashboard.title')}</h2>
            <div className="grid grid-3">
                <Module
                    title={t('admin.dashboard.users_title')}
                    desc={t('admin.dashboard.users_desc')}
                    link="/admin/users"
                    type="primary"
                />
                <Module
                    title={t('admin.dashboard.cars_title')}
                    desc={t('admin.dashboard.cars_desc')}
                    link="/admin/cars"
                    type="success"
                />
                <Module
                    title={t('admin.dashboard.loc_title')}
                    desc={t('admin.dashboard.loc_desc')}
                    link="/admin/locations"
                    type="warning"
                />
            </div>
        </div>
    );
};
export default AdminDashboard;