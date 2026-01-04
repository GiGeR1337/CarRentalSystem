import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RentalService from '../services/rental.service';

const MyRentals = () => {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        RentalService.getMyHistory()
            .then(data => {
                setRentals(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching rentals:", err);
                setLoading(false);
            });
    }, []);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = rentals.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(rentals.length / itemsPerPage);

    if (loading) return <div className="text-center mt-4">Loading history...</div>;

    return (
        <div className="container mt-4">
            <div className="flex-between mb-4">
                <h2>My Rental History</h2>
                <span className="text-muted">{rentals.length} bookings</span>
            </div>

            {rentals.length === 0 ? (
                <div className="card text-center" style={{ padding: '60px' }}>
                    <h3 className="text-muted">You haven't rented any cars yet.</h3>
                    <Link to="/" className="btn btn-primary mt-4">Browse Available Cars</Link>
                </div>
            ) : (
                <>
                    <div className="table-container">
                        <table>
                            <thead>
                            <tr>
                                <th>Vehicle Info</th>
                                <th>Rental Period</th>
                                <th>Total Cost</th>
                                <th>Status</th>
                                {/* FIX: Centered Header */}
                                <th style={{ textAlign: 'center' }}>Manage</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.map(rental => (
                                <tr key={rental.idRental}>
                                    <td>
                                        <strong>{rental.car?.brand} {rental.car?.model}</strong>
                                        <div className="text-muted" style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                                            {rental.car?.location?.city} • {rental.car?.year}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span>{rental.dateFrom}</span>
                                            <span className="text-muted">➔</span>
                                            <span>{rental.dateTo}</span>
                                        </div>
                                    </td>
                                    <td style={{ color: 'var(--success)', fontWeight: 'bold' }}>
                                        ${rental.finalPrice}
                                    </td>
                                    <td>
                                        {/* FIX: Force Uppercase for CSS matching */}
                                        <span className={`badge ${rental.rentalStatus?.status?.toUpperCase()}`}>
                                                {rental.rentalStatus?.status}
                                            </span>
                                    </td>
                                    {/* FIX: Centered Column */}
                                    <td style={{ textAlign: 'center' }}>
                                        {rental.rentalStatus?.status === 'ACTIVE' ? (
                                            <button
                                                className="btn btn-outline btn-sm"
                                                onClick={() => navigate(`/rentals/edit/${rental.idRental}`)}
                                            >
                                                Edit / Cancel
                                            </button>
                                        ) : (
                                            <span className="text-muted" style={{ fontSize: '0.85rem' }}>Closed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span className="text-muted">Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MyRentals;