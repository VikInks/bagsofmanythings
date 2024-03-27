import { useContext } from 'react';
import { fr } from './fr';
import { en } from './en';
import { LanguageDictionary } from "./type";
import {LanguageContext} from "../lang/lang.context";

export function useTranslate() {
    const context = useContext(LanguageContext);
    const lang = context?.lang || 'en';
    const languageDictionary = lang === 'fr' ? fr : en;

    return (dict: keyof LanguageDictionary) => languageDictionary[dict] || "";
}
