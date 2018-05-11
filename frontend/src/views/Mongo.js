import React from 'react';
import QuerySelect from '../components/QuerySelect'
import QueryOne from '../components/QueryOne'
import '../css/main.css'
import { getPlaceholder } from '../helpers/helper'


class Mongo extends React.Component {
    constructor (props) {
        super();
        this.state = { 
            selectedQuery: "1",
            data: null, 
        };
    }

    setData(data) {
        this.setState({data: data})
    }

    setQuery(q){
        this.setState({selectedQuery: q})
    }

    render() {
        let placeholder = getPlaceholder(this.state.selectedQuery)
        return (
            <div className="col-md-12" style={{ marginTop: 20 }}>
                <h4>Select which query to use with the MongoDB database</h4>
                
                <QuerySelect setQuery={(q) => this.setQuery(q)} />
                
                <QueryOne 
                    placeholder={placeholder} 
                    selectedQuery={this.state.selectedQuery} 
                    setData={(data) => this.setData(data)}
                />

            </div>
        );
    }
}

export default Mongo;