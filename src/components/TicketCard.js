// src/components/TicketCard.js
import React, { useState } from 'react';
import styles from './TicketCard.module.css';
import Modal from './Modal';

const TicketCard = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.card}>
      <img src={event.image} alt={event.name} className={styles.image} />
      <div className={styles.details}>
        <h2 className={styles.name}>{event.name}</h2>
        <p className={styles.date}>{event.date}</p>
        <p className={styles.location}>{event.location}</p>
        <button className={styles.bookButton} onClick={handleOpenModal}>Book Now</button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} event={event} />
    </div>
  );
};

export default TicketCard;
