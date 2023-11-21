import React from 'react';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {}

const LoadingSpinner = () => (
  <div className={styles['']}>
      <div className={styles["loader"]}></div>
  </div>
);

export default LoadingSpinner;
