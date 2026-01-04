import { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AdminLocations = () => {
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/locations/all').then(res => setLocations(res.data));
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this location?")) return;
        try {
            await api.delete(`/locations/delete/${id}`);
            setLocations(locations.filter(l => l.idLocation !== id));
        } catch (err) {
            alert("Cannot delete location (might be used by cars).");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Manage Locations</h2>
            <table className="table table-hover mt-3">
                <thead className="table-primary">
                <tr>
                    <th>City</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {locations.map(loc => (
                    <tr key={loc.idLocation}>
                        <td>{loc.city}</td>
                        <td>{loc.address}</td>
                        <td>
                            <button onClick={() => navigate(`/admin/locations/edit/${loc.idLocation}`)} className="btn btn-warning btn-sm me-2">Update</button>
                            <button onClick={() => handleDelete(loc.idLocation)} className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminLocations;