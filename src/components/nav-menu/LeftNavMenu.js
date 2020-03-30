import React from 'react';
import { Link } from 'react-router-dom';

import css from './NavMenu.module.css';

const LeftNavMenu = ({isNavExpanded}) => {
  const navClasses = [
    css.NavMenu,
    'lg',
    isNavExpanded ? css.visible : null
  ]

  return (
    <div className={navClasses.join(' ')}>
      <div className={css.Content}>
        <Link to='/' className={css.Link}>Overview</Link>

        <hr />

        <a
          href='https://github.com/Harvtronix/my-corona'
          target='_new'
          className={css.Link}
        >
          GitHub&nbsp;&nbsp;<code>{'</>'}</code>
        </a>

      </div>
    </div>
  )
}

export default LeftNavMenu
