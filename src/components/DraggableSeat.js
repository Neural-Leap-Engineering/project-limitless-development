// src/components/DraggableSeat.js
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import styles from './DraggableSeat.module.css';

const DraggableSeat = () => {
  const [seat, setSeat] = useState({ x: 0, y: 0 });

  const handleDrag = (e, data) => {
    setSeat({ x: data.x, y: data.y });
  };

  return (
    <Draggable onDrag={handleDrag}>
      <div className={styles.seat}>Seat</div>
    </Draggable>
  );
};

export default DraggableSeat;
