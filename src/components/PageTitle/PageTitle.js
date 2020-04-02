import React, { useContext } from 'react';

import css from './PageTitle.module.css';
import TitleContext from '../TitleContext';

const PageTitle = () => {
  const {title} = useContext(TitleContext);

  return (
    <h1 className={css.PageTitle}>
      {title}
    </h1>
  )
}

export default PageTitle;
