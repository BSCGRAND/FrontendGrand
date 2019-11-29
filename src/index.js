import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {template} from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(template, document.getElementById('root'));

serviceWorker.unregister();
