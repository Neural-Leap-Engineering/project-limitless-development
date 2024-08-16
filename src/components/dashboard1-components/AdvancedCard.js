// src/components/dashboard1-components/AdvancedCard.js

import React from 'react';
import BaseCard from '../BaseCard/BaseCard';


export default function AdvancedCard({ title, value, change }) {
  return (
    <BaseCard title={title}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{value}</h3>
        <span style={{ fontSize: '0.875rem', color: change > 0 ? 'green' : 'red' }}>
          {change > 0 ? `+${change}%` : `${change}%`}
        </span>
      </div>
    </BaseCard>
  );
}
