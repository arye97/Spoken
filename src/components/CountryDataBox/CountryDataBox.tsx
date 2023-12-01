import React, {useEffect, useState} from 'react';
import styles from './CountryDataBox.module.scss';
import {goToUrl, multiCSSHandler} from "../../utils/map.utils";
import {CountryResponse} from "../../utils/types";
import {useLanguageSelection} from "../../providers/LanguageStore.provider";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import testImage from './germany-test-photo.jpg';

interface CountryDataBoxProps {
    countryData: CountryResponse
}

interface ICredits {
    name: string,
    url: string
}

const accessToken = process.env.REACT_APP_UNSPLASH_KEY;

const CountryDataBox = (props: CountryDataBoxProps) => {

    const languageStore = useLanguageSelection();

    const [photoUrl, setPhotoUrl] = useState<string>('');

    const [imageCredits, setImageCredits] = useState<ICredits>();

    const handleCountrySelection = () => {
        languageStore.updateSingleSelectedCountry(props.countryData);
    }

    useEffect(() => {
        // getPhotoUrl().then();
    }, []);

    useEffect(() => {
        setPhotoUrl('');
    }, [languageStore.selectedLanguage]);

    const getPhotoUrl = async () => {
        const url = `https://api.unsplash.com/photos/random?query=${props.countryData.name.common}&client_id=${accessToken}`;
        const response = await fetch(url, {
            method: 'GET'
        });

        const dataUrl = response.json().then(
            data => {
                if (data) {
                    setPhotoUrl(data.urls.small);
                    setImageCredits({
                       name: data.user.name,
                       url: data.user.links.html
                    });
                }
            }
        ).catch(() => {
            console.log('oops')
        });
    }

    const formatPopCount = (pop: number) => {
        if (pop > 1.0e+6 && pop < 1.0e+8) {
            return (Math.abs(Number(props.countryData.population)) / 1.0e+6).toFixed(2) + "M";
        } else if (pop < 1.0e+6) {
            return (Math.abs(Number(props.countryData.population)) / 1.0e+3).toFixed(2) + "K";
        } else if (pop > 1.0e+8) {
            return (Math.abs(Number(props.countryData.population)) / 1.0e+9).toFixed(2) + "B";
        }

    }

    return (
        <div onClick={() => { handleCountrySelection() } } className={multiCSSHandler(['databox-container', 'cover'], styles)}>
            <h2 className={styles['title']}>
                { props.countryData.name.common } |
                <span className={styles['title-pop-count'] + " material-symbols-outlined"}>
                    record_voice_over
                </span>
                { formatPopCount(props.countryData.population) }
            </h2>
            <hr/>
            {
                photoUrl ?
                    <div>
                        <img className={styles['cover']} src={photoUrl} alt={'not loaded'}/>
                        {
                            imageCredits ?
                                <div className={styles['credits-container']} onClick={() => goToUrl(imageCredits.url)}>
                                    {
                                        "Photo by " + imageCredits?.name
                                    }
                                </div> : null
                        }

                    </div>:
                    <div className={styles['spinner']}>
                        <LoadingSpinner  />
                    </div>
            }

        </div>
    );
}

export default CountryDataBox;
