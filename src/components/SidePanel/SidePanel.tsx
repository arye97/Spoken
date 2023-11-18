import React from 'react';
import styles from './SidePanel.module.scss';
import {useAppState} from "../../providers/AppState.provider";
import {multiCSSHandler} from "../../utils/map.utils";

interface SidePanelProps {}

const SidePanel = (props: SidePanelProps) => {
    const appState = useAppState();

    return (
        appState.sidePanelIsOpen ?
        <div className={multiCSSHandler(['side-panel-border', 'side-panel'], styles)}>
            SidePanel Component
            <div className={styles['footer']}>
                <hr/>
                footer
            </div>
        </div> : null
    )
};

export default SidePanel;
