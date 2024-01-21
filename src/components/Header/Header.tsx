import React, {useState} from 'react';
import styles from './Header.module.scss';
import SelectDropdown from "../SelectDropdown/SelectDropdown";
import { useAppState } from "../../providers/AppState.provider";
import { useLanguageSelection } from "../../providers/LanguageStore.provider";
import SearchBox from "../SearchBox/SearchBox";

interface HeaderProps {}

const Header = () => {

    const appState = useAppState();

    return (
        <div className={styles['container']}>
            {
                !!appState.searchBoxIsOpen ?
                    <SearchBox />
                    : null
            }
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
                        <button className={styles['header-button']} onClick={() => {
                            appState.openSearchBox();
                        }} type="submit" name="submit"><i className="material-symbols-outlined">search</i></button>
                    </div>
                </div>
            </div>

        </div>
    );
}


export default Header;
