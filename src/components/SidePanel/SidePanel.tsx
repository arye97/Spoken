import React, {useEffect, useState} from 'react';
import styles from './SidePanel.module.scss';
import MapButtons from "../MapButtons/MapButtons";
import {IMapControlButton, MapButtonGroups, SidePanelState} from "../../utils/types";
import {useAppState} from "../../providers/AppState.provider";
import {useLanguageSelection} from "../../providers/LanguageStore.provider";
import CountriesListContainer from "../CountriesListContainer/CountriesListContainer";
import LanguageDataBox from "../LanguageDataBox/LanguageDataBox";

interface SidePanelProps {}

const SidePanel = (props: SidePanelProps) => {

    const appState = useAppState();
    const languageState = useLanguageSelection();

    const buttonGroupTypes = [
        MapButtonGroups.MapControls,
        MapButtonGroups.SidePanelControls
    ];
  
    const [sidePanelViewState, setSidePanelViewState] = useState<SidePanelState>(SidePanelState.Closed);

    useEffect(() => {
        if (languageState.selectedLanguage.name) {
            const buttons: IMapControlButton[] = [
                {
                    icon: 'flag',

                    callbackMethod: () => {
                        setSidePanelViewState(SidePanelState.CountryListData);
                    }
                },
                {
                    icon: 'translate',
                    callbackMethod: () => {
                        setSidePanelViewState(SidePanelState.LanguageData);
                    }
                },
                {
                    icon: 'frame_reload',
                    callbackMethod: () => {
                        setSidePanelViewState(SidePanelState.Closed);
                    }
                }
            ];
            setSidePanelViewState(SidePanelState.CountryListData);
            appState.addMapButtonGroup(MapButtonGroups.SidePanelControls, buttons);
        }
    }, [languageState.selectedLanguage, appState]);

    return (
        <div className={styles['side-panel']}>
            <div className={styles['buttons']}>
                {
                    buttonGroupTypes.map(key => {
                        const group = appState.buttonGroupsMap[key];
                        if (!group) return;
                        return (
                            <div key={key}>
                                {
                                    !appState.searchBoxIsOpen ? <MapButtons buttons={group}/> : null
                                }

                            </div>
                        )
                    })
                }
            </div>
            {
                sidePanelViewState !== SidePanelState.Closed && !appState.searchBoxIsOpen &&
                <div>
                    {
                        sidePanelViewState === SidePanelState.CountryListData ?
                            <CountriesListContainer /> :
                        sidePanelViewState === SidePanelState.LanguageData ?
                            <LanguageDataBox /> :
                        null
                    }
                </div>
            }


        </div>
    );
}

export default SidePanel;
