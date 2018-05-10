/**
 * Created by Kristian Nielsen on 02-05-2018.
 */

import React from 'react';
import ReactDOM from 'react-dom';

// ESLint failer uden den her linje ...
React.toString();

const title = 'Bookup lolsdf dd';

ReactDOM.render(
    <div>{title}</div>,
    document.getElementById('app')
);