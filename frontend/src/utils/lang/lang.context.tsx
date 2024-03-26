import React, { createContext, useState, useContext } from 'react';

interface LanguageContextProps {
    lang: string;
    setLang: React.Dispatch<React.SetStateAction<string>>;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const LanguageProvider: React.FC = ({ children } : { children: React.ReactNode }) => {
    const [lang, setLang] = useState('en');

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
};

const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export { LanguageProvider, useLanguage };
