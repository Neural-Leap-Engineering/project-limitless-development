// src/components/Tooltip.js
import React from 'react';
import styles from './Tooltip.module.css';

const Tooltip = ({ text, children }) => {
  return (
    <div className={styles.tooltip}>
      {children}
      <span className={styles.tooltiptext}>{text}</span>
    </div>
  );
};

export default Tooltip;
