import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import CarService from '../../services/car.service';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import Pagination from "../../components/Pagination";

const AdminCars = () => {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        CarService.getAll().then(setCars);
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm(t('admin.cars.confirm_delete'))) {
            try {
                await CarService.delete(id);

                const updatedCars = cars.filter(c => c.idCar !== id);
                setCars(updatedCars);

                const newTotalPages = Math.ceil(updatedCars.length / itemsPerPage);
                if (currentPage > newTotalPages) {
                    setCurrentPage(Math.max(1, newTotalPages));
                }

                toast.success(t('admin.cars.success_delete'));
            } catch (err) {
                toast.error(t('admin.cars.error_delete'));
            }
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cars.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(cars.length / itemsPerPage);

    return (
        <div className="container mt-4">
            <div className="flex-between mb-4">
                <h2>{t('admin.cars.title')}</h2>
                <button onClick={() => navigate('/admin/cars/create')}
                        className="btn btn-primary">{t('admin.cars.btn_add')}</button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>{t('admin.cars.col_car')}</th>
                        <th>{t('admin.cars.col_rate')}</th>
                        <th>{t('admin.cars.col_status')}</th>
                        <th>{t('admin.cars.col_location')}</th>
                        <th className="text-right">{t('admin.cars.col_actions')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map(c => (
                        <tr key={c.idCar}>
                            <td><strong>{c.brand} {c.model}</strong>
                                <div className="text-muted">{c.year}</div>
                            </td>
                            <td>${c.price}</td>
                            <td><span className={`badge ${c.carStatus.status}`}>{c.carStatus.status}</span></td>
                            <td>{c.location.city}</td>
                            <td className="text-right">
                                <button onClick={() => navigate(`/admin/cars/edit/${c.idCar}`)} className="btn btn-outline btn-sm mr-2">{t('common.edit')}</button>
                                <button onClick={() => handleDelete(c.idCar)} className="btn btn-danger btn-sm">{t('common.delete')}</button>
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
        </div>
    );
};
export default AdminCars;