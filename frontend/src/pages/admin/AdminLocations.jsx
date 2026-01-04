import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import LocationService from '../../services/location.service';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import Pagination from "../../components/Pagination";

const AdminLocations = () => {
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        LocationService.getAll().then(setLocations).catch(console.error);
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm(t('admin.locations.confirm_delete'))) return;
        try {
            await LocationService.delete(id);

            const updatedLocations = locations.filter(l => l.idLocation !== id);
            setLocations(updatedLocations);

            const newTotalPages = Math.ceil(updatedLocations.length / itemsPerPage);
            if (currentPage > newTotalPages) {
                setCurrentPage(Math.max(1, newTotalPages));
            }

            toast.success(t('admin.locations.success_delete'));
        } catch (err) {
            toast.error(t('admin.locations.error_delete'));
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = locations.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(locations.length / itemsPerPage);

    return (
        <div className="container mt-4">
            <div className="flex-between mb-4">
                <h2>{t('admin.locations.title')}</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/admin/locations/create')}>
                    {t('admin.locations.btn_add')}
                </button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>{t('admin.locations.col_id')}</th>
                        <th>{t('admin.locations.col_city')}</th>
                        <th>{t('admin.locations.col_address')}</th>
                        <th className="text-right">{t('admin.locations.col_actions')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map(loc => (
                        <tr key={loc.idLocation}>
                            <td>#{loc.idLocation}</td>
                            <td><strong>{loc.city}</strong></td>
                            <td>{loc.address}</td>
                            <td className="text-right">
                                <button onClick={() => navigate(`/admin/locations/edit/${loc.idLocation}`)} className="btn btn-outline btn-sm mr-2">{t('common.edit')}</button>
                                <button onClick={() => handleDelete(loc.idLocation)} className="btn btn-danger btn-sm">{t('common.delete')}</button>
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

export default AdminLocations;