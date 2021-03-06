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
            this.props.setData()
        }

        return (
            <div className="width-50p">
                <div className="input-group mb-3">
                    <select id = "selectQuery" className="custom-select" value={this.state.selectedQuery} onChange={setQuery}>
                        <option value="1">One - Get all book titles mentioning city</option>
                        <option id = "query2" value="2">Two - Get map of mentioned cities based on book title</option>
                        <option id = "query3" value="3">Three - Get list of books by author and map of mentioned cities</option>
                        <option id = "query4" value="4">Four - Get list of books based on geolocation</option>
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