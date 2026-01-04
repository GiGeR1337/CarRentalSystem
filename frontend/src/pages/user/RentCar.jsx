import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarService from '../services/car.service';
import RentalService from '../services/rental.service';

const RentCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [dates, setDates] = useState({ dateFrom: '', dateTo: '' });
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // 1. Fetch Car using Service
    useEffect(() => {
        CarService.getById(id)
            .then(setCar)
            .catch(() => navigate('/'));
    }, [id, navigate]);

    // 2. Calculate Price automatically
    useEffect(() => {
        if (car && dates.dateFrom && dates.dateTo) {
            const start = new Date(dates.dateFrom);
            const end = new Date(dates.dateTo);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > 0) {
                setTotalPrice(diffDays * car.price);
            } else {
                setTotalPrice(0);
            }
        }
    }, [dates, car]);

    const handleRent = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (new Date(dates.dateFrom) > new Date(dates.dateTo)) {
            setError("End date cannot be before start date.");
            setLoading(false);
            return;
        }

        try {
            // Use RentalService
            await RentalService.rentCar({
                idCar: id,
                dateFrom: dates.dateFrom,
                dateTo: dates.dateTo
            });
            alert('Booking confirmed!');
            navigate('/my-rentals');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to book. Car might be unavailable.');
        } finally {
            setLoading(false);
        }
    };

    if (!car) return <div className="text-center mt-4">Loading details...</div>;

    return (
        <div className="container flex-center" style={{ minHeight: '80vh' }}>
            <div className="card grid grid-2" style={{ maxWidth: '900px', width: '100%', padding: '0', overflow: 'hidden' }}>

                {/* LEFT: Car Details Panel */}
                <div style={{ background: 'var(--bg-body)', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="badge AVAILABLE" style={{ alignSelf: 'flex-start', marginBottom: '10px' }}>
                        Available Now
                    </div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0', lineHeight: '1.1' }}>{car.brand}</h1>
                    <h2 style={{ color: 'var(--primary)', marginBottom: '20px' }}>{car.model}</h2>

                    <div className="text-muted" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span>📍 Location: {car.location?.city}</span>
                        <span>📅 Year: {car.year}</span>
                        <span>⛽ Status: Excellent Condition</span>
                    </div>

                    <div style={{ marginTop: '30px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                        <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>${car.price}</span>
                        <span className="text-muted"> / day</span>
                    </div>
                </div>

                {/* RIGHT: Booking Form */}
                <div style={{ padding: '40px' }}>
                    <h3 className="mb-4">Select Dates</h3>

                    {error && (
                        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', padding: '10px', borderRadius: 'var(--radius)', marginBottom: '15px', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRent}>
                        <div className="form-group">
                            <label>Pick-up Date</label>
                            <input
                                type="date"
                                min={new Date().toISOString().split("T")[0]}
                                onChange={e => setDates({...dates, dateFrom: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Return Date</label>
                            <input
                                type="date"
                                min={dates.dateFrom}
                                onChange={e => setDates({...dates, dateTo: e.target.value})}
                                required
                            />
                        </div>

                        {/* Price Summary Box */}
                        <div style={{ padding: '20px', background: 'var(--bg-body)', borderRadius: 'var(--radius)', margin: '25px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="text-muted">Total Estimate</span>
                            <span style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                ${totalPrice.toFixed(2)}
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '12px' }}
                            disabled={loading || totalPrice <= 0}
                        >
                            {loading ? 'Processing...' : 'Confirm Booking'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RentCar;