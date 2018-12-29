import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import configureStore from './store';


import './styles/index.scss';
import App from './App';

ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>,
    document.getElementById('root')
);

