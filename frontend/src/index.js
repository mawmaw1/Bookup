import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

// ESLint failer uden den her linje ... nå
React.toString();

const title = 'Bookup lolsdf dd ff';

// window.jQuery = window.$ = require('jquery')
// require('bootstrap/dist/css/bootstrap.min.css')
// require('bootstrap/dist/js/bootstrap.min.js')

ReactDOM.render(
    <App />,
    document.getElementById('app')
);