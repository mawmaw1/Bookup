import React from 'react';
import {Link} from 'react-router-dom';

class NavBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {'selectedTab': 1};
    }

    render () {

        const getActive = (tab) => {
            if (this.state.selectedTab === tab) {
                return 'active';
            }

            return '';
        };

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Bookup</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className={`nav-item ${getActive(1)}`} onClick={() => this.setState({'selectedTab': 1})}>
                            <a className="nav-link" href="#/">Postgres</a>
                        </li>
                        <li className={`nav-item ${getActive(2)}`} onClick={() => this.setState({'selectedTab': 2})}>
                            <a id= "mongoNavBar" className="nav-link" href="#/mongo">MongoDB</a>
                        </li>

                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavBar;