import React, { useState } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import css from './App.module.css';
import TitleContext from './components/TitleContext';

import Overview from './routes/__default__/Overview';
import Stats from './routes/stats/Stats';
import NavMenu from './components/nav-menu/NavMenu';
import PageTitle from './components/page-title/PageTitle';

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
                <Route path="/" component={Overview} />
              </Switch>
          </div>
        </div>
      </HashRouter>
    </TitleContext.Provider>
  );
}

export default App;
