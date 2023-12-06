import {Context, createContext, useContext, useEffect, useState} from "react";
import {CountryResponse, ILanguage} from "../utils/types";
import {fetchAllLanguages, fetchCountriesByLanguage} from "../services/map.service";

export interface LanguageStoreContextType {
    selectedLanguage: ILanguage,
    countries: CountryResponse[],
    allLanguages: ILanguage[],
    selectedSingleCountry: CountryResponse,
    updateSelectedLanguage: (language: ILanguage) => void,
    updateCountries: (countryList: CountryResponse[]) => void,
    getCountriesForLanguage: (language: string) => Promise<CountryResponse[]>,
    updateSingleSelectedCountry: (country: CountryResponse) => void
}

const LanguageStoreContext: Context<LanguageStoreContextType> = createContext<LanguageStoreContextType>(null!);

export interface LanguageSelectorProviderProps {
    children: JSX.Element | JSX.Element[];
}

const LanguageStoreProvider = ({children}: LanguageSelectorProviderProps) => {

    const [selectedLanguage, setSelectedLanguage] = useState<ILanguage>({} as ILanguage);
    const [selectedSingleCountry, setSelectedSingleCountry] = useState<CountryResponse>({} as CountryResponse);
    const [countries, setCountries] = useState<CountryResponse[]>([]);
    const [allLanguages, setAllLanguages] = useState<ILanguage[]>([]);

    const [languageToCountryMap, setLanguageToCountryMap] = useState<Map<string, CountryResponse[]>>(new Map<string, CountryResponse[]>);

    useEffect(() => {
        fetchAllLanguages().then((languageList) => {
            setAllLanguages(languageList);
        });
    }, []);

    const updateSelectedLanguage = (language: ILanguage) => {
        setSelectedLanguage(language);
    }

    const updateSingleSelectedCountry = (country: CountryResponse) => {
        /*
            need to rotate the object if the user clicks
            the same country again (so it re-zooms)
        */
        setSelectedSingleCountry({} as CountryResponse);
        setTimeout(() => {
            setSelectedSingleCountry(country);
        }, 50);
    }

    const updateCountries = (countryList: CountryResponse[]) => {
        setCountries(countryList);
    }

    const getCountriesForLanguage = async (language: string): Promise<CountryResponse[]> => {
        // Save ourselves a network request
        if (languageToCountryMap.has(language)) {
            setCountries(languageToCountryMap.get(language) ?? []);
            return languageToCountryMap.get(language) ?? []
        }

        const results = await fetchCountriesByLanguage(language);
        languageToCountryMap.set(language, results);
        setCountries(results);

        return results;
    }

    const ctx = {
        selectedLanguage,
        countries,
        allLanguages,
        selectedSingleCountry,
        updateSingleSelectedCountry,
        updateSelectedLanguage,
        updateCountries,
        getCountriesForLanguage
    };

    return <LanguageStoreContext.Provider value={ctx}>{children}</LanguageStoreContext.Provider>
}

export const useLanguageSelection = () => {
    return useContext(LanguageStoreContext);
}

export default LanguageStoreProvider;
