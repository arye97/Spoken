import React from 'react';
import styles from './SearchBox.module.scss';
import {useAppState} from "../../providers/AppState.provider";
import SelectDropdown from "../SelectDropdown/SelectDropdown";

interface SearchBoxProps {}

const SearchBox = (props: SearchBoxProps) => {
    const appState = useAppState();

    return (
        <div className={styles['SearchBox']}>
            <div className={styles['transparent-layer']} onClick={() => appState.closeSearchBox()}/>
            <div className={styles['search-container']}>
                <SelectDropdown />
            </div>
        </div>
    );
}

export default SearchBox;
