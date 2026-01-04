import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-5">Admin Dashboard</h2>
            <div className="row g-4">
                {/* Users Module */}
                <div className="col-md-4">
                    <div className="card text-center h-100 shadow-sm border-primary">
                        <div className="card-body d-flex flex-column justify-content-center p-5">
                            <h3 className="card-title text-primary">Users</h3>
                            <p className="card-text">Manage registered users.</p>
                            <Link to="/admin/users" className="btn btn-primary mt-3">Manage Users</Link>
                        </div>
                    </div>
                </div>

                {/* Cars Module */}
                <div className="col-md-4">
                    <div className="card text-center h-100 shadow-sm border-success">
                        <div className="card-body d-flex flex-column justify-content-center p-5">
                            <h3 className="card-title text-success">Cars</h3>
                            <p className="card-text">Update or delete vehicles.</p>
                            <Link to="/admin/cars" className="btn btn-success mt-3">Manage Cars</Link>
                        </div>
                    </div>
                </div>

                {/* Locations Module */}
                <div className="col-md-4">
                    <div className="card text-center h-100 shadow-sm border-warning">
                        <div className="card-body d-flex flex-column justify-content-center p-5">
                            <h3 className="card-title text-warning">Locations</h3>
                            <p className="card-text">Edit pickup locations.</p>
                            <Link to="/admin/locations" className="btn btn-warning mt-3">Manage Locations</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;