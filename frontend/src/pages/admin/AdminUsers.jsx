import { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        api.get('/users/all')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await api.delete(`/users/delete/${id}`);
            setUsers(users.filter(u => u.idUser !== id)); // Remove from list instantly
        } catch (err) {
            alert("Failed to delete user.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Manage Users</h2>
            <table className="table table-striped mt-3">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map(u => (
                    <tr key={u.idUser}>
                        <td>{u.idUser}</td>
                        <td>{u.name} {u.surname}</td>
                        <td>{u.email}</td>
                        <td>{u.phoneNumber}</td>
                        <td>
                            <button onClick={() => handleDelete(u.idUser)} className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;