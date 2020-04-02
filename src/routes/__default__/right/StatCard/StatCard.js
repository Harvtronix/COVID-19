import React from 'react';

import css from './StatCard.module.css';
import Header from './Header';
import Content from './Content';

const StatCard = (props) => {
  return (
    <div className={css.StatCard}>
      <div className={css.Content}>
        {props.children}
      </div>
    </div>
  )
}

export default {
  Container: StatCard,
  Header,
  Content
}
