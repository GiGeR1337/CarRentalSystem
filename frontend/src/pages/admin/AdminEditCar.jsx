import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

const AdminEditCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // We store raw IDs for status/location to send back to backend
    const [formData, setFormData] = useState({
        brand: '', model: '', price: '', year: '', idStatus: '', idLocation: ''
    });

    useEffect(() => {
        // Fetch Car details
        api.get(`/cars/id/${id}`).then(res => {
            const car = res.data;
            setFormData({
                brand: car.brand,
                model: car.model,
                price: car.price,
                year: car.year,
                idStatus: car.carStatus.idStatus,       // Ensure backend sends this ID inside object
                idLocation: car.location.idLocation     // Ensure backend sends this ID inside object
            });
        }).catch(err => alert("Error loading car"));
    }, [id]);

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await api.put(`/cars/update/${id}`, formData);
            alert("Car updated!");
            navigate('/admin/cars');
        } catch (err) {
            setError("Failed to update car. It might be rented or unavailable.");
        }
    };

    return (
        <div className="container mt-5" style={{maxWidth: '600px'}}>
            <div className="card p-4">
                <h3>Edit Car</h3>

                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-2"><label>Brand</label><input className="form-control" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} required /></div>
                    <div className="mb-2"><label>Model</label><input className="form-control" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} required /></div>
                    <div className="mb-2"><label>Price</label><input type="number" className="form-control" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required /></div>
                    <div className="mb-2"><label>Year</label><input type="number" className="form-control" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} required /></div>

                    {/* Simplified: In real app, use <select> fetched from /api/locations/all */}
                    <div className="mb-2"><label>Location ID</label><input type="number" className="form-control" value={formData.idLocation} onChange={e => setFormData({...formData, idLocation: e.target.value})} required /></div>
                    <div className="mb-3"><label>Status ID (1=Available, 2=Rented)</label><input type="number" className="form-control" value={formData.idStatus} onChange={e => setFormData({...formData, idStatus: e.target.value})} required /></div>

                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-success flex-grow-1">Save Changes</button>
                        <button type="button" onClick={() => navigate('/admin/cars')} className="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditCar;