import {REST_COUNTRIES_ALL_COUNTRIES_URL, REST_COUNTRIES_SINGLE_LANGUAGE_URL} from "../utils/constants";
import {CountryResponse, ILanguage} from "../utils/types";

export const fetchCountriesByLanguage = async (language: string): Promise<CountryResponse[]> => {
    const url = REST_COUNTRIES_SINGLE_LANGUAGE_URL + language;
    let currentCountryInfo = await fetch(url, {
        method: 'GET'
    });
    try {
        const countries = await currentCountryInfo.json();
        return countries.map((country: any) => {
            return {
                cca3: country.cca3,
                name: country.name,
                languages: country.languages,
                coords: {
                    lat: country.latlng[0],
                    lng: country.latlng[1]
                },
                area: country.area,
                population: country.population,
                continent: country.continent,
                flags: country.flags
            }
        });
    } catch (e) {
        console.error('Failed to retrieve countries for selection');
        return [];
    }

}

export const fetchAllLanguages = async (): Promise<ILanguage[]> => {

    const languageList: ILanguage[] = [];
    let currentCountryInfo = await fetch(REST_COUNTRIES_ALL_COUNTRIES_URL, {
        method: 'GET'
    });

    const countries = await currentCountryInfo.json();

    countries.forEach((country: any) => {
        if (!country.languages) return;
        const keys = Object.keys(country.languages);

        [...keys].forEach((key: string) => {
            let language: ILanguage = {
                name: country.languages[key],
                cca3: key
            };

            languageList.push(language);
        });
    });

    return languageList.filter((arr, index, self) =>
        index === self.findIndex(temp => {
            return temp.name === arr.name
        })
    ).sort((a, b) => (a.name < b.name) ? -1 : 1)

}
