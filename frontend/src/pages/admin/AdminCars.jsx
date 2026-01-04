import { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AdminCars = () => {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/cars/all').then(res => setCars(res.data));
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this car?")) return;
        try {
            await api.delete(`/cars/delete/${id}`);
            setCars(cars.filter(c => c.idCar !== id));
        } catch (err) {
            alert("Failed to delete car.");
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Manage Cars</h2>
                <button className="btn btn-primary" onClick={() => navigate('/admin/cars/create')}>+ Add New Car</button>
            </div>
            <table className="table table-bordered mt-3">
                <thead className="table-light">
                <tr>
                    <th>Brand/Model</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cars.map(c => (
                    <tr key={c.idCar}>
                        <td>{c.brand} {c.model} ({c.year})</td>
                        <td>${c.price}</td>
                        <td>{c.carStatus.status}</td>
                        <td>{c.location.city}</td>
                        <td>
                            <button
                                onClick={() => navigate(`/admin/cars/edit/${c.idCar}`)}
                                className="btn btn-warning btn-sm me-2">
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(c.idCar)}
                                className="btn btn-danger btn-sm">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCars;