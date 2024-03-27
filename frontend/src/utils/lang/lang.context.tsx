import React, { createContext, useState, useContext } from 'react';

interface LanguageContextProps {
    lang: string;
    setLang: React.Dispatch<React.SetStateAction<string>>;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>({
    lang: 'en',
    setLang: () => { throw new Error('setLang function must be overridden'); },
});

const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const browserLang = ['en', 'fr'].includes(navigator.language.slice(0, 2)) ? navigator.language.slice(0, 2) : 'en';
    const [lang, setLang] = useState(browserLang);

    console.log(browserLang);

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
