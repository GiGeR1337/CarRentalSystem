import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import RentalService from '../../services/rental.service.js';
import {useTranslation} from 'react-i18next';
import Pagination from "../../components/Pagination.jsx";

const MyRentals = () => {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {t} = useTranslation();

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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = rentals.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(rentals.length / itemsPerPage);

    if (loading) return <div className="text-center mt-4">{t('common.loading')}</div>;

    return (
        <div className="container mt-4">
            <div className="flex-between mb-4">
                <h2>{t('rentals.title')}</h2>
                <span className="text-muted">{rentals.length} {t('rentals.bookings')}</span>
            </div>

            {rentals.length === 0 ? (
                <div className="card text-center">
                    <h3 className="text-muted">{t('rentals.empty')}</h3>
                    <Link to="/" className="btn btn-primary mt-4">{t('rentals.browse')}</Link>
                </div>
            ) : (
                <>
                    <div className="table-container">
                        <table>
                            <thead>
                            <tr>
                                <th>{t('rentals.col_vehicle')}</th>
                                <th>{t('rentals.col_period')}</th>
                                <th>{t('rentals.col_cost')}</th>
                                <th>{t('rentals.col_status')}</th>
                                <th className="text-center">{t('rentals.col_manage')}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.map(rental => (
                                <tr key={rental.idRental}>
                                    <td>
                                        <strong>{rental.car?.brand} {rental.car?.model}</strong>
                                        <div className="text-muted text-sm mt-1">
                                            {rental.car?.location?.city} • {rental.car?.year}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex-align-center gap-2">
                                            <span>{rental.dateFrom}</span>
                                            <span className="text-muted">➔</span>
                                            <span>{rental.dateTo}</span>
                                        </div>
                                    </td>
                                    <td className="text-success font-bold">
                                        ${rental.finalPrice}
                                    </td>
                                    <td>
                                        <span className={`badge ${rental.rentalStatus?.status?.toUpperCase()}`}>
                                            {rental.rentalStatus?.status}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        {rental.rentalStatus?.status === 'ACTIVE' ? (
                                            <button
                                                className="btn btn-outline btn-sm"
                                                onClick={() => navigate(`/rentals/edit/${rental.idRental}`)}
                                            >
                                                {t('rentals.btn_edit')}
                                            </button>
                                        ) : (
                                            <span className="text-muted text-sm">
                                                {t('rentals.status_closed')}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default MyRentals;