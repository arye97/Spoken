import React, {useEffect, useState} from 'react';
import styles from './CountryDataBox.module.scss';
import {formatPopCount,  multiCSSHandler} from "../../utils/map.utils";
import {CountryResponse} from "../../utils/types";
import {useLanguageSelection} from "../../providers/LanguageStore.provider";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

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
        getPhotoUrl().then();
    }, []);

    useEffect(() => {
        setPhotoUrl('');
    }, [languageStore.selectedLanguage]);

    const downloadPhoto = (download_location: string) => {
        const url = `${download_location}&client_id=${accessToken}`;
        fetch(url, {
            method: 'GET'
        }).then();
    }

    const getPhotoUrl = async () => {

        const name = props.countryData.name.common.replaceAll(' ', ',');
        const url = `https://api.unsplash.com/photos/random?query=${name}&client_id=${accessToken}`;
        const response = await fetch(url, {
            method: 'GET'
        });

        response.json().then(
            data => {
                if (data) {
                    setPhotoUrl(data.urls.small);
                    setImageCredits({
                       name: data.user.name,
                       url: data.user.links.html + '?utm_source=Spoken&utm_medium=referral'
                    });
                    downloadPhoto(data.links.download_location);
                }
            }
        ).catch(() => {
            console.error('Could not fetch image');
        });
    }

    return (
        <div onClick={() => { handleCountrySelection() } } className={multiCSSHandler(['databox-container'], styles)}>
                <h2 className={styles['title']}>
                    <img src={props.countryData.flags.svg} alt={'flag'} className={styles['flag']}/>
                    <div className={styles['title-container']}>
                        { props.countryData.name.common } |
                        <span className={styles['title-pop-count'] + " material-symbols-outlined"}>
                            record_voice_over
                        </span>
                        { formatPopCount(props.countryData.population) }
                    </div>

                </h2>
            <hr/>
            <div className={styles['loader'] + ' ' + styles['cover']}>
                {
                    photoUrl ?
                        <div>
                            <img className={styles['cover']} src={photoUrl} alt={''}/>
                            {
                                imageCredits ?
                                    <a className={styles['credits-container']} href={imageCredits.url} target={'_blank'}>
                                        Photo by {imageCredits?.name} on Unsplash
                                    </a>
                                    : null
                            }
                        </div>:
                        <div className={styles['spinner']}>
                            <LoadingSpinner  />
                        </div>
                }
            </div>


        </div>
    );
}

export default CountryDataBox;
