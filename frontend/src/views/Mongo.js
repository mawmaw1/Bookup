import React from 'react';
import QuerySelect from '../components/QuerySelect'
import QueryOne from '../components/QueryOne'
import DataTableTwo from '../components/DataTableTwo'
import DataTableOne from '../components/DataTableOne'
import DataTableThree from '../components/DataTableThree'
import CityMap from '../components/CityMap'
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
        let matches = this.state.data ? this.state.data.length : 0

        return (
            <div className="col-md-12" style={{ marginTop: 20 }}>
                <h4>Select which query to use with the MongoDB database</h4>

                <QuerySelect setQuery={(q) => this.setQuery(q)} setData={() => this.setState({ data: null })} />

                <QueryOne
                    placeholder={placeholder}
                    selectedQuery={this.state.selectedQuery}
                    setData={(data) => this.setData(data)}
                    data={this.state.data}
                />

                <CityMap
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `800px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    data={this.state.data}
                    selectedQuery={this.state.selectedQuery}
                />

                <DataTableOne data={this.state.data} selectedQuery={this.state.selectedQuery} amount={matches} />
                <DataTableTwo data={this.state.data} selectedQuery={this.state.selectedQuery} />
                <DataTableThree data={this.state.data} selectedQuery={this.state.selectedQuery} />

            </div>
        );
    }
}

export default Mongo;