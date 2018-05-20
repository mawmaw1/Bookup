
import React from 'react'
import axios from 'axios'

console.log('process.env.BACKEND_HOST:', process.env.BACKEND_HOST);

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
                    console.log('Query 1 response:',
                        res.status,
                        !res.data ? 'no data' : typeof res.data
                    );

                    if(res.data && res.data.length > 0){
                        console.log('map should be defined:', res.data.map)
                        // res.data.forEach((el) => {
                        //     if(!el.authors){
                        //         console.log('element with not author array:')
                        //         console.log(el)
                        //     }
                        // })
                        this.props.setData(res.data)
                    }else{
                        console.log('set data not called since no data was fetched');
                    }

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
                    this.props.setData(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            }

            if (this.props.selectedQuery === "4") {
                let values = this.state.inputVal.split(',')
                let lat = parseFloat(values[0])
                let long = parseFloat(values[1])
                axios.post(dbPrefix + '/query4', {
                    lat: lat,
                    lng: long,
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

        let getExample = () => {
            if (this.props.selectedQuery === "4") {
                return (
                    <div>Example string could be "40.71427, -74.00597" where the first value is latitude and the second value is longitude.</div>
                )
            }
            return <span></span>
        }

        return (
            <div>
                <div className="width-50p">
                    <div className="input-group mb-3">
                        <input id='queryInput' type="text" className="form-control" placeholder={this.props.placeholder} value={this.state.inputVal} onChange={inputChanged} 
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
                {getExample()}
            </div>
        )
    }
}
        
export default QueryOne