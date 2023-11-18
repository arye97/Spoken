import React from 'react';
import styles from './MapButtons.module.scss';

interface MapButtonsProps {
    buttons: {
        icon: string,
        callbackMethod: () => void
    }[]
}

const MapButtons = (props: MapButtonsProps) => (
  <div className={styles['map-buttons']}>
      {
          props.buttons.length > 0 ?
              props.buttons.map((button) => {
                  // Todo: the key here wont allow for multiple of the same icon
                  return (
                      <button key={button.icon} className={styles['map-button']} type="submit" name="submit" onClick={button.callbackMethod}><i className="material-symbols-outlined">{button.icon}</i></button>
                  );
              })
          : null
      }

  </div>
);

export default MapButtons;
