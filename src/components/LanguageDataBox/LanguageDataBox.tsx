import React, { FC } from 'react';
import styles from './LanguageDataBox.module.scss';

interface LanguageDataBoxProps {}

const LanguageDataBox: FC<LanguageDataBoxProps> = () => (
  <div className={styles.LanguageDataBox}>
    LanguageDataBox Component
  </div>
);

export default LanguageDataBox;
