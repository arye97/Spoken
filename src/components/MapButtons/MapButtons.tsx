import React from 'react';
import styles from './MapButtons.module.scss';
import MapButton from "../MapButton/MapButton";

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
                      <MapButton icon={button.icon} callbackMethod={button.callbackMethod} />
                  );
              })
          : null
      }

  </div>
);

export default MapButtons;
