import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import CarService from '../../services/car.service.js';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';

const Home = () => {
    const [cars, setCars] = useState([]);
    const {t} = useTranslation();

    useEffect(() => {
        CarService.getAll()
            .then(setCars)
            .catch(err => {
                console.error(err);
                toast.error(t('home.error_load'));
            });
    }, [t]);

    return (
        <div className="container">
            <div className="flex-between mb-4">
                <h2>{t('home.title')}</h2>
                <div className="text-muted">{cars.length} {t('home.ready')}</div>
            </div>

            <div className="grid grid-3">
                {cars.map(car => {
                    const isAvailable = car.carStatus?.status === 'AVAILABLE';
                    return (
                        <div key={car.idCar} className="card flex-col">
                            <div className="flex-between mb-4">
                                <div>
                                    <h3 className="mb-0 text-lg">{car.brand} {car.model}</h3>
                                    <span className="text-muted text-sm">{car.year} • {car.location?.city}</span>
                                </div>
                                <span className="badge AVAILABLE text-base">${car.price}</span>
                            </div>

                            <div className="mt-auto">
                                {isAvailable ? (
                                    <Link to={`/rent/${car.idCar}`} className="btn btn-primary w-100 text-center">
                                        {t('home.bookNow')}
                                    </Link>
                                ) : (
                                    <button disabled className="btn btn-outline w-100 border-dashed">
                                        {t('home.rented')}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Home;