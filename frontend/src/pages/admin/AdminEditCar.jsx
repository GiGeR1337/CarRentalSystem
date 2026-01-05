import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CarService from '../../services/car.service';
import LocationService from '../../services/location.service'; // 1. Import LocationService
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import CarStatusService from "../../services/carStatus.service.js";

const AdminEditCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        brand: '', model: '', price: '', year: '', idStatus: '', idLocation: ''
    });

    const [locations, setLocations] = useState([]);
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        LocationService.getAll()
            .then(setLocations)
            .catch(err => console.error("Error loading locations", err));

        CarStatusService.getAll()
            .then(setStatuses)
            .catch(err => console.error("Error loading statuses", err));

        CarService.getById(id)
            .then(car => {
                setFormData({
                    brand: car.brand,
                    model: car.model,
                    price: car.price,
                    year: car.year,
                    idStatus: car.carStatus?.idStatus || '',
                    idLocation: car.location?.idLocation || ''
                });
            })
            .catch(() => toast.error(t('admin.edit_car.error_load')));
    }, [id, t]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await CarService.update(id, formData);
            toast.success("admin.edit_car.success_update");
            navigate('/admin/cars');
        } catch (err) {
            toast.error(t('admin.edit_car.error_update'));
        }
    };

    return (
        <div className="container flex-center min-h-80vh">
            <div className="card max-w-500px w-100">
                <h3 className="mb-4">{t('admin.edit_car.title', { id })}</h3>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>{t('admin.create_car.brand')}</label>
                        <input
                            value={formData.brand}
                            onChange={e => setFormData({ ...formData, brand: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('admin.create_car.model')}</label>
                        <input
                            value={formData.model}
                            onChange={e => setFormData({ ...formData, model: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>{t('admin.create_car.price')}</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('admin.create_car.year')}</label>
                        <input
                            type="number"
                            value={formData.year}
                            onChange={e => setFormData({ ...formData, year: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>{t('admin.create_car.location')}</label>
                        <select
                            value={formData.idLocation}
                            onChange={e => setFormData({ ...formData, idLocation: e.target.value })}
                            required
                        >
                            <option value="" disabled>Select Location</option>
                            {locations.map(loc => (
                                <option key={loc.idLocation} value={loc.idLocation}>
                                    {loc.city} ({loc.address})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>{t('admin.create_car.status')}</label>
                        <select
                            value={formData.idStatus}
                            onChange={e => setFormData({ ...formData, idStatus: e.target.value })}
                            required
                        >
                            <option value="" disabled>Select Status</option>
                            {statuses.map(status => (
                                <option key={status.idStatus} value={status.idStatus}>
                                    {status.status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <button type="submit" className="btn btn-primary flex-1">{t('common.save')}</button>
                        <button type="button" onClick={() => navigate('/admin/cars')} className="btn btn-outline">{t('common.cancel')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditCar;