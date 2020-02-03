import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import 'leaflet/dist/leaflet.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Provider from './context/context';

ReactDOM.render(
    <Provider>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
