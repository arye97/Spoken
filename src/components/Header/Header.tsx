import React, {useState} from 'react';
import styles from './Header.module.scss';
import SelectDropdown from "../SelectDropdown/SelectDropdown";
import {goToUrl, multiCSSHandler} from "../../utils/map.utils";
import {useAppState} from "../../providers/AppState.provider";
import languageStoreProvider, {useLanguageSelection} from "../../providers/LanguageStore.provider";
import {WIKIPEDIA_LINK} from "../../utils/constants";

interface HeaderProps {}

const Header = () => {

    const [showSearch, setShowSearch] = useState<boolean>(false);

    const appState = useAppState();
    const languageSelection = useLanguageSelection();

    return (
        <div className={styles['container']}>
            <div className={styles['header-position']}>
                <div className={styles['menu-layout']}>
                    <h1 className={styles['header']}>Spoken</h1>
                </div>
                <div className={styles['search-box']}>
                    {
                        <div className={styles['dropdown']}>
                            <SelectDropdown />
                        </div>
                    }
                    <div className={styles['search-container']}>
                        <button disabled={!languageSelection.selectedLanguage.name} className={styles['header-button']} onClick={() => { goToUrl(
                            WIKIPEDIA_LINK(languageSelection.selectedLanguage.name)
                        )}} type="submit" name="submit"><i className="material-symbols-outlined">search</i></button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Header;
