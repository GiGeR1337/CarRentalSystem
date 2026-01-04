import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RentalService from '../services/rental.service';

const EditRental = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [rental, setRental] = useState(null);
    const [dates, setDates] = useState({ dateFrom: '', dateTo: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        RentalService.getMyHistory().then(data => {
            const found = data.find(r => r.idRental === parseInt(id));
            if (found) {
                setRental(found);
                setDates({ dateFrom: found.dateFrom, dateTo: found.dateTo });
            } else {
                setError("Rental not found");
            }
        });
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await RentalService.updateMyRental(id, {
                ...dates,
                idCar: rental.car.idCar
            });
            alert("Rental updated successfully!");
            navigate('/my-rentals');
        } catch (err) {
            setError("Failed to update. Check dates.");
        }
    };

    const handleCancel = async () => {
        if (!window.confirm("Cancel this booking? Cannot be undone.")) return;
        try {
            await RentalService.cancelRental(id);
            navigate('/my-rentals');
        } catch (err) {
            alert("Failed to cancel.");
        }
    };

    if (!rental) return <div className="text-center mt-4">Loading...</div>;

    return (
        <div className="container flex-center" style={{ minHeight: '60vh' }}>
            <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="mb-4" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px' }}>
                    <h3 className="mb-1">Manage Booking #{rental.idRental}</h3>
                    <p className="text-muted">{rental.car.brand} {rental.car.model}</p>
                </div>

                {error && <div style={{ color: 'var(--danger)', marginBottom: '15px' }}>{error}</div>}

                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label>Start Date</label>
                        <input type="date" value={dates.dateFrom} onChange={e => setDates({...dates, dateFrom: e.target.value})} required />
                    </div>
                    <div className="form-group">
                        <label>End Date</label>
                        <input type="date" value={dates.dateTo} onChange={e => setDates({...dates, dateTo: e.target.value})} required />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                        <button type="submit" className="btn btn-success">Update Dates</button>

                        {rental.rentalStatus.status === 'ACTIVE' && (
                            <button type="button" onClick={handleCancel} className="btn btn-danger">
                                Cancel Rental
                            </button>
                        )}

                        <button type="button" onClick={() => navigate('/my-rentals')} className="btn btn-outline">
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditRental;