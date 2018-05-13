import React from 'react'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8081';

class QueryOne extends React.Component {
    constructor (props) {
        super();
        this.state = { 
            inputVal: "", 
        };
    }

    render() {

        let getData = () => {
            // REST calls should be placed here. Remember to use this.props.setData(dataFromRest) when data has been fetched
            if (this.props.selectedQuery === "2") {
                axios.post('/postgres/query2', {
                    title: this.state.inputVal
                })
                .then((res) => {
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
            <div className="width-50p">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder={this.props.placeholder} value={this.state.inputVal} onChange={inputChanged}  />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={() => getData()}>Search</button>
                    </div>
                </div>
            </div>
        )
    }
}
        
export default QueryOne