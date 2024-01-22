import React, {useEffect, useState} from 'react';
import styles from './LanguageDataBox.module.scss';
import {useLanguageSelection} from "../../providers/LanguageStore.provider";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {WIKIPEDIA_LINK} from "../../utils/constants";

interface LanguageDataBoxProps {
    title?: string,
    description?: string
}

const LanguageDataBox = () => {

    const languageState = useLanguageSelection();

    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        fetchLanguageData();
    }, [languageState.selectedLanguage]);

    const fetchLanguageData = () => {
        const wikiUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&origin=*&titles=';
        fetch(wikiUrl + languageState.selectedLanguage.name + '_language', {
            method: 'GET'
        }).then((result) => {
            result.json().then((x: any) => {
                const desc = (Object.values(x.query.pages) as any)[0].extract;
                setDescription(desc);
            })
        });

    }

    return (
        <div className={styles['languagebox']}>
            <div className={styles['databox-container']}>
                <h2 className={styles['title']}>
                    { languageState.selectedLanguage.name }
                </h2>
                {
                    description.length > 0 ?
                        <div>
                            <p className={styles['content']}>
                                { description }
                                <a className={styles['more-button']} href={WIKIPEDIA_LINK(languageState.selectedLanguage.name)} target={'_blank'}>Learn More</a>
                            </p>

                        </div>
                        :
                        <div className={styles['spinner']}>
                            <LoadingSpinner/>
                        </div>
                }
            </div>
        </div>

    );
}

export default LanguageDataBox;
