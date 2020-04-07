import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Data from './modules/Data';
import App from './App';

Data.setup();

ReactDOM.render(<App />, document.getElementById('root'));
