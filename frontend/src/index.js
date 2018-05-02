/**
 * Created by Kristian Nielsen on 02-05-2018.
 */

import React from 'react';
import ReactDOM from 'react-dom';

React.toString(); // ESLint failer uden den her linje ...

const title = 'Bookup';

ReactDOM.render(
    <div>{title}</div>,
    document.getElementById('app')
);