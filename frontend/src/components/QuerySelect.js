import React from 'react'

import '../css/main.css'


class QuerySelect extends React.Component {
    constructor (props) {
        super(props);
        this.state = { selectedQuery: "1" };
    }

    render() {

        let setQuery = (e) => {
            this.setState({selectedQuery: e.target.value})
            this.props.setQuery(e.target.value)
        }

        return (
            <div className="width-50p">
                <div className="input-group mb-3">
                    <select className="custom-select" value={this.state.selectedQuery} onChange={setQuery}>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Four</option>
                    </select>
                    <div className="input-group-append">
                        <label className="input-group-text">Choose query</label>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuerySelect