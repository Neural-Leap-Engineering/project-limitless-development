// src/components/Checkbox.js
import React from 'react';
import styles from './Checkbox.module.css';

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className={styles.container}>
      {label}
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default Checkbox;
