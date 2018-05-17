
import React from 'react'
import axios from 'axios'

axios.defaults.baseURL = process.env.BACKEND_HOST;


class QueryOne extends React.Component {
    constructor (props) {
        super();
        this.state = { 
            inputVal: "", 
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data === null && prevProps !== this.props) {
            this.setState({inputVal: ""})
        }
    }

    render() {
        let getData = () => {
            let path = window.location.href.split('#')[1]
            let dbPrefix = path === '/mongo' ? '/mongo' : '/postgres'
            // REST calls should be placed here. Remember to use this.props.setData(dataFromRest) when data has been fetched
            if (this.props.selectedQuery === "1") {
                axios.post(dbPrefix + '/query1', {
                    city: this.state.inputVal
                })
                .then((res) => {
                    console.log(res.data)
                    this.props.setData(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            }

            if (this.props.selectedQuery === "2") {
                axios.post(dbPrefix + '/query2', {
                    title: this.state.inputVal
                })
                .then((res) => {
                    console.log(res)
                    this.props.setData(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            }

            if (this.props.selectedQuery === "3") {
                axios.post(dbPrefix + '/query3', {
                    author: this.state.inputVal
                })
                .then((res) => {
                    console.log(res.data)
                    this.props.setData(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            }

            if (this.props.selectedQuery === "4") {
                axios.post(dbPrefix + '/query4', {
                    lat: this.state.inputVal,
                    lng: 0 //mja
                })
                .then((res) => {
                    console.log(res.data)
                    this.props.setData(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }

        let inputChanged = (e) => {
            this.setState({inputVal: e.target.value})
        }

        return (
            <div>
                <div className="width-50p">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder={this.props.placeholder} value={this.state.inputVal} onChange={inputChanged} 
                            onKeyPress={event => {
                                if (event.key === "Enter") {
                                    getData()
                                }
                            }}
                        />
                        <div className="input-group-append">
                            <button id="search-button" className="btn btn-outline-secondary" type="button" onClick={() => getData()}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
        
export default QueryOne