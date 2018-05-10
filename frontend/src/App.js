import React, {Component} from 'react';
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom';

import Mongo from './views/Mongo';
import Postgres from './views/Postgres';
import NavBar from './components/NavBar';

class App extends Component {
    render () {
        return (
            <HashRouter>
                <div className="App">
                    <div className="">

                        <NavBar />


                        <Route exact={true} path="/" component={Postgres} />
                        <Route path="/mongo" component={Mongo} />
                    </div>
                </div>


            </HashRouter>
        );
    }
}

export default App;