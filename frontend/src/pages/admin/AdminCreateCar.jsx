import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import CarService from '../../services/car.service';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';

const AdminCreateCar = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [formData, setFormData] = useState({
        brand: '', model: '', price: '', year: '', idStatus: 1, idLocation: 1
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await CarService.create(formData);
            toast.success(t('admin.create_car.success'));
            navigate('/admin/cars');
        } catch (err) {
            toast.error(t('admin.create_car.error'));
        }
    };

    return (
        <div className="container flex-center min-h-80vh">
            <div className="card max-w-500px w-100">
                <h3 className="mb-4">{t('admin.create_car.title')}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-2 mb-4">
                        <div className="form-group">
                            <label>{t('admin.create_car.brand')}</label>
                            <input
                                value={formData.brand}
                                onChange={e => setFormData({...formData, brand: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>{t('admin.create_car.model')}</label>
                            <input
                                value={formData.model}
                                onChange={e => setFormData({...formData, model: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-2 mb-4">
                        <div className="form-group">
                            <label>{t('admin.create_car.price')}</label>
                            <input type="number"
                                   value={formData.price}
                                   onChange={e => setFormData({...formData, price: e.target.value})}
                                   required
                            />
                        </div>
                        <div className="form-group">
                            <label>{t('admin.create_car.year')}</label>
                            <input type="number"
                                   value={formData.year}
                                   onChange={e => setFormData({...formData, year: e.target.value})}
                                   required
                            />
                        </div>
                    </div>

                    <div className="grid grid-2 mb-4">
                        <div className="form-group">
                            <label>{t('admin.create_car.location_id')} <span
                                className="text-muted">{t('admin.create_car.helper_loc')}</span></label>
                            <input type="number"
                                   value={formData.idLocation}
                                   onChange={e => setFormData({...formData, idLocation: e.target.value})}
                                   required
                            />
                        </div>
                        <div className="form-group">
                            <label>{t('admin.create_car.status_id')} <span
                                className="text-muted">{t('admin.create_car.helper_status')}</span></label>
                            <input type="number"
                                   value={formData.idStatus}
                                   onChange={e => setFormData({...formData, idStatus: e.target.value})}
                                   required
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <button type="submit" className="btn btn-success flex-1">{t('admin.create_car.btn_create')}</button>
                        <button type="button" onClick={() => navigate('/admin/cars')}
                                className="btn btn-outline">{t('common.cancel')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminCreateCar;