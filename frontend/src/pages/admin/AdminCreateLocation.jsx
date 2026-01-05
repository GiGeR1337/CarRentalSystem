import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import LocationService from '../../services/location.service';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';

const AdminCreateLocation = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [formData, setFormData] = useState({
        city: '',
        address: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await LocationService.create(formData);
            toast.success(t('admin.create_location.success'));
            navigate('/admin/locations');
        } catch (err) {
            toast.error(t('admin.create_location.error'));
        }
    };

    return (
        <div className="container flex-center min-h-80vh">
            <div className="card max-w-500px w-100">
                <h3 className="mb-4">{t('admin.create_location.title')}</h3>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>{t('admin.create_location.city')}</label>
                        <input
                            value={formData.city}
                            onChange={e => setFormData({...formData, city: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>{t('admin.create_location.address')}</label>
                        <input
                            value={formData.address}
                            onChange={e => setFormData({...formData, address: e.target.value})}
                            required
                        />
                    </div>

                    <div className="flex gap-2 mt-4">
                        <button type="submit" className="btn btn-primary flex-1">
                            {t('admin.create_location.btn_create')}
                        </button>
                        <button type="button" onClick={() => navigate('/admin/locations')} className="btn btn-outline">
                            {t('common.cancel')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminCreateLocation;