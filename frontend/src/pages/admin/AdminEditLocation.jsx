import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

const AdminEditLocation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ city: '', address: '' });

    useEffect(() => {
        api.get(`/locations/${id}`).then(res => {
            setFormData({ city: res.data.city, address: res.data.address });
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/locations/update/${id}`, formData);
            alert("Location updated!");
            navigate('/admin/locations');
        } catch (err) {
            alert("Failed to update.");
        }
    };

    return (
        <div className="container mt-5" style={{maxWidth: '500px'}}>
            <div className="card p-4">
                <h3>Edit Location</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>City</label>
                        <input className="form-control" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} required />
                    </div>
                    <div className="mb-4">
                        <label>Address</label>
                        <input className="form-control" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required />
                    </div>
                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-primary flex-grow-1">Save</button>
                        <button type="button" onClick={() => navigate('/admin/locations')} className="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditLocation;