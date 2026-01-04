import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import LocationService from '../../services/location.service';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';

const AdminEditLocation = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [formData, setFormData] = useState({city: '', address: ''});

    useEffect(() => {
        LocationService.getById(id).then(res => {
            setFormData({city: res.city, address: res.address});
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await LocationService.update(id, formData);
            toast.success("Location updated successfully!");
            navigate('/admin/locations');
        } catch (err) {
            toast.error(t('admin.edit_location.error_update'));
        }
    };

    return (
        <div className="container flex-center min-h-60vh">
            <div className="card max-w-500px w-100">
                <h3 className="mb-4">{t('admin.edit_location.title')}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>{t('admin.edit_location.city')}</label>
                        <input
                            value={formData.city}
                            onChange={e => setFormData({...formData, city: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('admin.edit_location.address')}</label>
                        <input
                            value={formData.address}
                            onChange={e => setFormData({...formData, address: e.target.value})}
                            required
                        />
                    </div>
                    <div className="flex gap-2 mt-2">
                        <button type="submit" className="btn btn-primary flex-1">{t('common.save')}</button>
                        <button type="button" onClick={() => navigate('/admin/locations')}
                                className="btn btn-outline">{t('common.cancel')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditLocation;