import React from 'react';

import css from './Right.module.css';
import StatCard from './stat-card/StatCard';

const Right = () => {
  return (
    <div className={css.Right}>
      <StatCard.Container>
        <StatCard.Header>
          Confirmed (total)
        </StatCard.Header>
        <StatCard.Content>
          123,456
        </StatCard.Content>
      </StatCard.Container>

      <StatCard.Container>
        <StatCard.Header>
          Confirmed (day/day)
        </StatCard.Header>
        <StatCard.Content>
          + 1234 (12.5%) ↑
        </StatCard.Content>
      </StatCard.Container>

      <StatCard.Container>
        <StatCard.Header>
          Rate of change (3-day avg)
        </StatCard.Header>
        <StatCard.Content>
          2.558 ↓
        </StatCard.Content>
      </StatCard.Container>
    </div>
  )
}

export default Right;
