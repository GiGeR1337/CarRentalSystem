import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

const AdminCreateCar = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        price: '',
        year: '',
        idStatus: 1, // Default to 1 (Available)
        idLocation: 1 // Default to 1 (Warsaw)
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/cars/create', formData);
            alert("Car created successfully!");
            navigate('/admin/cars');
        } catch (err) {
            console.error(err);
            alert("Failed to create car. Check console for details.");
        }
    };

    return (
        <div className="container mt-5" style={{maxWidth: '600px'}}>
            <div className="card shadow p-4">
                <h3 className="mb-4">Add New Car</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Brand</label>
                            <input className="form-control"
                                   value={formData.brand}
                                   onChange={e => setFormData({...formData, brand: e.target.value})}
                                   required />
                        </div>
                        <div className="col">
                            <label className="form-label">Model</label>
                            <input className="form-control"
                                   value={formData.model}
                                   onChange={e => setFormData({...formData, model: e.target.value})}
                                   required />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Price / Day</label>
                            <input type="number" className="form-control"
                                   value={formData.price}
                                   onChange={e => setFormData({...formData, price: e.target.value})}
                                   required />
                        </div>
                        <div className="col">
                            <label className="form-label">Year</label>
                            <input type="number" className="form-control"
                                   value={formData.year}
                                   onChange={e => setFormData({...formData, year: e.target.value})}
                                   required />
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col">
                            <label className="form-label">Location ID</label>
                            <input type="number" className="form-control"
                                   value={formData.idLocation}
                                   onChange={e => setFormData({...formData, idLocation: e.target.value})}
                                   required
                                   placeholder="e.g. 1"/>
                            <small className="text-muted">1=Warsaw, 4=Krakow</small>
                        </div>
                        <div className="col">
                            <label className="form-label">Status ID</label>
                            <input type="number" className="form-control"
                                   value={formData.idStatus}
                                   onChange={e => setFormData({...formData, idStatus: e.target.value})}
                                   required />
                            <small className="text-muted">1=Available</small>
                        </div>
                    </div>

                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-success flex-grow-1">Create Car</button>
                        <button type="button" onClick={() => navigate('/admin/cars')} className="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminCreateCar;