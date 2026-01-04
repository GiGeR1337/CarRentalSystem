import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import CarService from '../../services/car.service.js';
import RentalService from '../../services/rental.service.js';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';

const RentCar = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [car, setCar] = useState(null);
    const [dates, setDates] = useState({dateFrom: '', dateTo: ''});
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        CarService.getById(id)
            .then(setCar)
            .catch(() => {
                toast.error(t('rentals.error_booking'));
                navigate('/');
            });
    }, [id, navigate, t]);

    useEffect(() => {
        if (car && dates.dateFrom && dates.dateTo) {
            const start = new Date(dates.dateFrom);
            const end = new Date(dates.dateTo);
            const diffTime = end - start;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays >= 0) {
                const daysToCharge = diffDays === 0 ? 1 : diffDays;
                setTotalPrice(daysToCharge * car.price);
            } else {
                setTotalPrice(0);
            }
        }
    }, [dates, car]);

    const handleRent = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (new Date(dates.dateFrom) > new Date(dates.dateTo)) {
            toast.error(t('rentals.error_date_invalid'));
            setLoading(false);
            return;
        }

        try {
            await RentalService.rentCar({
                idCar: id,
                dateFrom: dates.dateFrom,
                dateTo: dates.dateTo
            });
            toast.success(t('rentals.success_booking'));
            navigate('/my-rentals');
        } catch (err) {
            toast.error(err.response?.data?.message || t('rentals.error_booking'));
        } finally {
            setLoading(false);
        }
    };

    if (!car) return <div className="text-center mt-4">{t('common.loading')}</div>;

    return (
        <div className="container flex-center min-h-80vh">
            <div className="card w-100 mw-600px">

                <div className="p-4">
                    <div className="flex-between mb-4">
                        <div>
                            <span className="badge AVAILABLE mb-2">{t('rentals.available_now')}</span>
                            <h1 className="text-2xl mb-0">{car.brand} {car.model}</h1>
                            <div className="text-muted mt-1">
                                📍 {car.location?.city} • 📅 {car.year}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-primary">${car.price}</div>
                            <div className="text-muted text-sm">{t('rentals.per_day')}</div>
                        </div>
                    </div>
                </div>

                <div className="border-top"></div>

                <div className="p-4 pt-3">
                    <h3 className="mb-4">{t('rentals.select_dates')}</h3>

                    <form onSubmit={handleRent}>
                        <div className="grid grid-2 mb-4">
                            <div className="form-group mb-0">
                                <label>{t('rentals.pickup_date')}</label>
                                <input
                                    type="date"
                                    min={new Date().toISOString().split("T")[0]}
                                    onChange={e => setDates({...dates, dateFrom: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group mb-0">
                                <label>{t('rentals.return_date')}</label>
                                <input
                                    type="date"
                                    min={dates.dateFrom}
                                    onChange={e => setDates({...dates, dateTo: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex-between mb-4 p-4 price-card">
                            <span className="text-muted">{t('rentals.total_estimate')}</span>
                            <span className="text-xl font-bold text-success">
                                ${totalPrice.toFixed(2)}
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading || totalPrice <= 0}
                        >
                            {loading ? t('rentals.processing') : t('rentals.btn_book')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RentCar;