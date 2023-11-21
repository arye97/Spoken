import React, {useEffect, useRef, useState} from 'react';
import styles from './SelectDropdown.module.scss'
import {fetchAllLanguages} from "../../services/map.service";
import {useLanguageSelection} from "../../providers/LanguageStore.provider";
import {DEFAULT_SELECT_VALUE} from "../../utils/constants";
import {multiCSSHandler} from "../../utils/map.utils";
import {useAppState, useOutsideAlerter} from "../../providers/AppState.provider";

interface SelectDropdownProps {}

const SelectDropdown = (props: SelectDropdownProps) => {

    const languageContext = useLanguageSelection();
    const appStateContext = useAppState();

    const optionsRef = useRef(null);
    const clickedOutside = useOutsideAlerter(optionsRef);

    const [dropdownOptions, setDropdownOptions] = useState<string[]>([DEFAULT_SELECT_VALUE]);
    const [searchEntry, setSearchEntry] = useState<string>('');
    const [hasEntry, setHasEntry] = useState<boolean>(true);
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const form = document.getElementById("form");
        const formData = new FormData(form as any);
        const formJson = Object.fromEntries(formData.entries());
        setSearchEntry(formJson.searchQuery as string);
    }

    useEffect(() => {
        handleDropdownView(false);
    }, [clickedOutside]);

    useEffect(() => {
        setHasEntry(true);
        const dad = document.getElementById('selectedLanguage');
        if (dad && (dad.children.length === 0 || dad.children[0].id === 'option-none-found')) {
            setHasEntry(false);
        }
    }, [searchEntry]);

    useEffect(() => {
        setDropdownOptions( [...languageContext.allLanguages.map(x => {return x.name})]);
    }, [languageContext.allLanguages])

    const changeSelectedLanguage = (lang: string) => {
        const searchBox = document.getElementById('search-box') as HTMLInputElement;
        if (searchBox) searchBox.value  = !showOptions ? "" : lang;
        languageContext.updateSelectedLanguage({name: lang, cca3: ''});
    }

    const handleDropdownView = (show: boolean) => {
        setShowOptions(show);
    }

    return (
        <div className={styles['select-position']} ref={optionsRef}>
            <form id="form" method="post" onChange={handleSubmit}>
                <input type='text' id="search-box" onClick={(() => { handleDropdownView(!showOptions) })} placeholder={DEFAULT_SELECT_VALUE} autoComplete={'off'} name="searchQuery" className={multiCSSHandler(['select-dropdown', 'arrow'], styles)}/>
                {
                    showOptions || searchEntry.length > 0 ?
                        <div className={styles['options-container']} id={"selectedLanguage"}>
                            {
                                dropdownOptions.map(option => {
                                    if (!searchEntry || option.toLowerCase().includes(searchEntry.toLowerCase())) {
                                        return (
                                            <div
                                                key={option}
                                                className={styles['search-option']} onClick={() => {
                                                changeSelectedLanguage(option)
                                            }}>{option}</div>
                                        )
                                    }
                                })
                            }
                            { !hasEntry ?
                                <div className={styles['search-option-none']} id={'option-none-found'}>None Found</div>
                                : null }
                        </div> : null
                }

            </form>
        </div>
    );
}

export default SelectDropdown;

