export interface CountryResponse {
    name: {
        common: string,
        official: string,
        nativeName: {
            [language: string] : {
                official: string,
                common: string
            }
        }
    },
    cca3: string,
    languages: {
        [language: string] : string;
    },
    coords: {
        lat: number,
        lng: number
    },
    area: number,
    population: number,
    continent: string,
    flags: {
        svg: string
    }
}

export interface ILanguage {
    name: string,
    cca3?: string
}

export interface IMapControlButton {
    icon: string,
    callbackMethod: () => void
}

export enum SidePanelState {
    CountryListData,
    LanguageData,
    AuthorData,
    Closed
}

export enum MapButtonGroups {
    MapControls,
    SidePanelControls
}
