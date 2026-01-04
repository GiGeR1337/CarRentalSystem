import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import RentalService from '../../services/rental.service.js';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';

const EditRental = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [rental, setRental] = useState(null);
    const [dates, setDates] = useState({dateFrom: '', dateTo: ''});

    useEffect(() => {
        RentalService.getMyHistory().then(data => {
            const found = data.find(r => r.idRental === parseInt(id));
            if (found) {
                setRental(found);
                setDates({dateFrom: found.dateFrom, dateTo: found.dateTo});
            } else {
                toast.error(t('rentals.error_not_found'));
                navigate('/my-rentals');
            }
        });
    }, [id, t, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await RentalService.updateMyRental(id, {
                ...dates,
                idCar: rental.car.idCar
            });
            toast.success(t('rentals.success_update'));
            navigate('/my-rentals');
        } catch (err) {
            toast.error(t('rentals.error_update'));
        }
    };

    const handleCancel = async () => {
        if (!window.confirm(t('rentals.confirm_cancel'))) return;
        try {
            await RentalService.cancelRental(id);
            toast.success(t('rentals.success_cancel'));
            navigate('/my-rentals');
        } catch (err) {
            toast.error(t('rentals.error_cancel'));
        }
    };

    if (!rental) return <div className="text-center mt-4">{t('common.loading')}</div>;

    return (
        <div className="container flex-center min-h-60vh">
            <div className="card w-100 max-w-500px">
                <div className="mb-4">
                    <h3>{t('rentals.manage_header', { id: rental.idRental })}</h3>
                    <p className="text-muted">{rental.car.brand} {rental.car.model}</p>
                </div>

                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label>{t('rentals.start_date')}</label>
                        <input
                            type="date"
                            value={dates.dateFrom}
                            onChange={e => setDates({...dates, dateFrom: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('rentals.end_date')}</label>
                        <input
                            type="date"
                            value={dates.dateTo}
                            onChange={e => setDates({...dates, dateTo: e.target.value})}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-4">
                        {t('rentals.btn_update')}
                    </button>

                    <div className="flex gap-2 mt-2">
                        <button type="button" onClick={() => navigate('/my-rentals')} className="btn btn-outline flex-1">
                            {t('rentals.btn_back')}
                        </button>

                        {rental.rentalStatus.status === 'ACTIVE' && (
                            <button type="button" onClick={handleCancel} className="btn btn-danger flex-1">
                                {t('rentals.btn_cancel_rental')}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditRental;