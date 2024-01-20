import React, {useEffect, useRef, useState} from 'react';
import styles from './SelectDropdown.module.scss';
import {useLanguageSelection} from "../../providers/LanguageStore.provider";
import {DEFAULT_SELECT_VALUE} from "../../utils/constants";
import {multiCSSHandler} from "../../utils/map.utils";
import {useAppState, useOutsideAlerter} from "../../providers/AppState.provider";
import {Simulate} from "react-dom/test-utils";

interface SelectDropdownProps {}

const SelectDropdown = (props: SelectDropdownProps) => {

    const appState = useAppState();

    const languageContext = useLanguageSelection();

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

        const selected = formJson.searchQuery as string;
        setSearchEntry(formJson.searchQuery as string);

        if (dropdownOptions.find(lang => lang.toLowerCase() === selected.toLowerCase())) {
            languageContext.updateSelectedLanguage({name: selected.toLowerCase(), cca3: ''});
            setShowOptions(false);
            appState.closeSearchBox();
        } else {
            setShowOptions(true);
        }
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
        setShowOptions(false);
        appState.closeSearchBox();
    }

    const handleDropdownView = (show: boolean) => {
        setShowOptions(show);
    }

    return (
        <div className={styles['select-position']} >
            <form id="form" onSubmit={handleSubmit} >
                <input id="search-box" onChange={handleSubmit} onClick={(() => { handleDropdownView(!showOptions) })} placeholder={DEFAULT_SELECT_VALUE} autoComplete={'off'} name="searchQuery" className={multiCSSHandler(['select-dropdown', 'arrow'], styles)}/>
                {
                    showOptions || (showOptions && searchEntry.length > 0) ?
                        <div className={styles['options-container']} id={"selectedLanguage"} ref={optionsRef}>
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

