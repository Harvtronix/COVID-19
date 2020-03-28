import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import Home from './routes/__default__/Home';
import Stats from './routes/stats/Stats';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path="/stats" component={Stats} />
          <Route path="/" component={Home} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
