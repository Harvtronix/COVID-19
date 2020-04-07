import React, { useState } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import css from './App.module.css';
import TitleContext from './components/_shared/TitleContext';

import Overview from './components/overview/Overview';
import Stats from './components/stats/Stats';
import NavMenu from './components/_shared/NavMenu/NavMenu';
import PageTitle from './components/_shared/PageTitle/PageTitle';

function App() {
  /**
   * Backing state for the Title Context
   */
  const [title, setTitle] = useState('');

  return (
    <TitleContext.Provider value={{title, setTitle}}>
      <HashRouter>
        <div className={css.App}>
          <NavMenu />
          <div className={[css.MainContent, 'content'].join(' ')}>
            <PageTitle />
            <Switch>
              <Route path="/stats" component={Stats} />
              <Route path="/overview" component={Overview} />
              <Route path="/" component={Overview} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    </TitleContext.Provider>
  );
}

export default App;
