import React from 'react'

import css from './NavMenu.module.css';

const SmallNavBar = ({toggleNavMenuCallback}) => (
  <div className={[css.SmallNavBar, 'sm'].join(' ')}>
    <div className={css.SmallNavBarContent}>
      <div className={css.HamburgerIcon} onClick={toggleNavMenuCallback}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
)

  export default SmallNavBar;
