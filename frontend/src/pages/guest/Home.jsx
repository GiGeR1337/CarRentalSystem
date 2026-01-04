import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CarService from '../services/car.service';

const Home = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        CarService.getAll().then(setCars).catch(console.error);
    }, []);

    return (
        <div className="container">
            <div className="flex-between mb-4">
                <h2>Available Fleet</h2>
                <div className="text-muted">{cars.length} vehicles ready</div>
            </div>

            <div className="grid grid-3">
                {cars.map(car => {
                    const isAvailable = car.carStatus?.status === 'AVAILABLE';
                    return (
                        <div key={car.idCar} className="card flex-col">
                            <div className="flex-between mb-4">
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0' }}>{car.brand} {car.model}</h3>
                                    <span className="text-muted" style={{ fontSize: '0.85rem' }}>{car.year} • {car.location?.city}</span>
                                </div>
                                <span className="badge AVAILABLE" style={{ fontSize: '1rem' }}>${car.price}</span>
                            </div>

                            <div style={{ marginTop: 'auto' }}>
                                {isAvailable ? (
                                    <Link to={`/rent/${car.idCar}`} className="btn btn-primary" style={{ width: '100%' }}>
                                        Book Now
                                    </Link>
                                ) : (
                                    <button disabled className="btn btn-outline" style={{ width: '100%', borderStyle: 'dashed' }}>
                                        Currently Rented
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