import React from 'react';
import styles from './MapButton.module.scss';

interface MapButtonProps {
    icon: string,
    callbackMethod?: () => void
}

const MapButton = (props: MapButtonProps) => {
    return (
        <button key={props.icon} className={styles['map-button']} type="submit" name="submit" onClick={props.callbackMethod}><i className="material-symbols-outlined">{props.icon}</i></button>
    );
};

export default MapButton;
