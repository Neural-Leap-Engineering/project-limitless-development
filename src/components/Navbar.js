// src/components/Navbar.js
import React, { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>Ticket Booking System</div>
      <div className={styles.toggle} onClick={toggleMenu}>
        ☰
      </div>
      <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <a href="/" className={styles.menuItem}>Home</a>
        <a href="/events" className={styles.menuItem}>Events</a>
        <a href="/contact" className={styles.menuItem}>Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
