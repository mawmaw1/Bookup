import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// ESLint failer uden den her linje ... nå
React.toString();

ReactDOM.render(
    <App />,
    document.getElementById('app')
);