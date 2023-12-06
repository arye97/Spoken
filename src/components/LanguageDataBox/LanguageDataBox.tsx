import React, { FC } from 'react';
import styles from './LanguageDataBox.module.scss';
import {WIKIPEDIA_LINK} from "../../utils/constants";
import {useLanguageSelection} from "../../providers/LanguageStore.provider";

interface LanguageDataBoxProps {}

const LanguageDataBox = () => {
    const languageState = useLanguageSelection();
    return (
       <div className={styles['languagebox']}>
           {/*<iframe src={WIKIPEDIA_LINK(languageState.selectedLanguage.name)}></iframe>*/}
       </div>
    );
}

export default LanguageDataBox;
