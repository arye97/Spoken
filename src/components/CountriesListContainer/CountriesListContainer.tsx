import React, {useEffect, useState} from 'react';
import styles from './CountriesListContainer.module.scss';
import {useAppState} from "../../providers/AppState.provider";
import {multiCSSHandler} from "../../utils/map.utils";
import {useLanguageSelection} from "../../providers/LanguageStore.provider";
import CountryDataBox from "../CountryDataBox/CountryDataBox";
import {CountryResponse} from "../../utils/types";
import MapButton from "../MapButton/MapButton";

interface CountriesContainerProps {}

const CountriesListContainer = (props: CountriesContainerProps) => {

    const languageState = useLanguageSelection();

    return (
            <div className={multiCSSHandler(['container'], styles)}>
                {
                    <div className={multiCSSHandler(['countrydata-container'], styles)}>
                        {
                            languageState.countries
                                .filter(x => !!x)
                                .sort((a, b) => (a.population > b.population) ? -1 : 1)
                                .map(country => {
                                    return (<CountryDataBox key={country.name.common} countryData={country}/>);
                                })
                        }
                    </div>
                }
        </div>
    )
};

export default CountriesListContainer;
