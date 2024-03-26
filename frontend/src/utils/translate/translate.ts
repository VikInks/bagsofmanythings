import { fr } from './fr';
import { en } from './en';
import { LanguageDictionary } from "./type";



export function translate(dict: keyof LanguageDictionary) {
    const languageDictionary = localStorage.getItem('lang') === 'fr' ? fr : en;
    return languageDictionary[dict] || "";
}
