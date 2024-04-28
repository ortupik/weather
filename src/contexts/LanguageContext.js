import React, { useState, createContext, useContext } from 'react';
import messages_en from '../translations/en.json';
import messages_sw from '../translations/sw.json';

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const translations = language === 'en' ? messages_en : messages_sw;

  const getText = (key) => translations[key] || key;

  return (
    <LanguageContext.Provider value={{
      language, setLanguage, getText, translations,
    }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => useContext(LanguageContext);

export { LanguageContext, LanguageProvider, useLanguage };
