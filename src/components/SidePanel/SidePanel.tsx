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

    const [buttonGroupsState, setButtonGroupsState] = useState<Map<MapButtonGroups, IMapControlButton[]>>();

    const [sidePanelViewState, setSidePanelViewState] = useState<SidePanelState>(SidePanelState.Closed);

    useEffect(() => {
        if (languageState.selectedLanguage.name && sidePanelViewState === SidePanelState.Closed) {
            const buttons: IMapControlButton[] = [
                {
                    icon: 'globe',
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
                    icon: 'person',
                    callbackMethod: () => {
                        console.log('person click');
                    }
                }
            ];
            setSidePanelViewState(SidePanelState.CountryListData);
            appState.addMapButtonGroup(MapButtonGroups.SidePanelControls, buttons);
        }
    }, [languageState.selectedLanguage]);

    useEffect(() => {
        setButtonGroupsState(appState.buttonGroupsMap);
    }, [appState.buttonGroupsMap])

    return (

        <div className={styles['side-panel']}>
            <div className={styles['buttons']}>
                {
                    buttonGroupTypes.map(key => {
                        const group = buttonGroupsState?.get(key) ?? [];
                        if (group.length === 0) return;
                        return (
                            <div key={key}>
                                <MapButtons buttons={group}/>
                            </div>
                        )
                    })
                }
            </div>
            {
                sidePanelViewState !== SidePanelState.Closed &&
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
