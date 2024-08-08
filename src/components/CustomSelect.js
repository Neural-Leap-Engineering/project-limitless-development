// src/components/CustomSelect.js
import React from 'react';
import styles from './CustomSelect.module.css';

const CustomSelect = ({ options, value, onChange }) => {
  return (
    <select className={styles.select} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
