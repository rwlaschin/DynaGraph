'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Panel from './components/Panel';
import './index.css';

console.log("Loading %s",__filename);

ReactDOM.render(
  ( <Panel /> ),
  document.getElementById('root')
);
