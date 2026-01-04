import { useTranslation } from 'react-i18next';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const { t } = useTranslation();

    if (totalPages <= 1) return null;

    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="pagination">
            <button
                onClick={handlePrev}
                disabled={currentPage === 1}
            >
                {t('common.previous')}
            </button>

            <span className="text-muted">
                {t('common.page_info', { current: currentPage, total: totalPages })}
            </span>

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                {t('common.next')}
            </button>
        </div>
    );
};

export default Pagination;