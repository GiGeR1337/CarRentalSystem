import {useEffect, useState} from 'react';
import UserService from '../../services/user.service';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import Pagination from "../../components/Pagination";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const {t} = useTranslation();

    useEffect(() => {
        UserService.getAll().then(setUsers).catch(console.error);
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm(t('admin.users.confirm_delete'))) return;
        try {
            await UserService.delete(id);

            const updatedUsers = users.filter(u => u.idUser !== id);
            setUsers(updatedUsers);

            const newTotalPages = Math.ceil(updatedUsers.length / itemsPerPage);
            if (currentPage > newTotalPages) {
                setCurrentPage(Math.max(1, newTotalPages));
            }

            toast.success(t('admin.users.success_delete'));
        } catch (err) {
            toast.error(t('admin.users.error_delete'));
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    return (
        <div className="container mt-4">
            <div className="flex-between mb-4">
                <h2>{t('admin.users.title')}</h2>
                <span className="text-muted">{users.length} {t('admin.users.count')}</span>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>{t('admin.users.col_id')}</th>
                        <th>{t('admin.users.col_name')}</th>
                        <th>{t('admin.users.col_email')}</th>
                        <th>{t('admin.users.col_phone')}</th>
                        <th className="text-right">{t('admin.users.col_actions')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map(u => (
                        <tr key={u.idUser}>
                            <td>#{u.idUser}</td>
                            <td><strong>{u.name} {u.surname}</strong></td>
                            <td>{u.email}</td>
                            <td>{u.phoneNumber}</td>
                            <td className="text-right">
                                <button onClick={() => handleDelete(u.idUser)} className="btn btn-danger btn-sm">
                                    {t('admin.users.btn_delete')}
                                </button>
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

export default AdminUsers;