// src/components/Modal.js
import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Confirm Booking</h2>
        <p>Are you sure you want to book tickets for {event.name}?</p>
        <button onClick={onClose} className={styles.button}>Confirm</button>
        <button onClick={onClose} className={`${styles.button} ${styles.cancel}`}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
