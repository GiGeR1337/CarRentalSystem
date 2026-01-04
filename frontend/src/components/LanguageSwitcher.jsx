import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    return (
        <div className="flex gap-1">
            <button
                onClick={() => i18n.changeLanguage('en')}
                className={`btn btn-xs ${i18n.language === 'en' ? 'btn-primary' : 'btn-outline'}`}
            >
                EN
            </button>
            <button
                onClick={() => i18n.changeLanguage('pl')}
                className={`btn btn-xs ${i18n.language === 'pl' ? 'btn-primary' : 'btn-outline'}`}
            >
                PL
            </button>
        </div>
    );
};

export default LanguageSwitcher;