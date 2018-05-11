import React from 'react'

class QueryOne extends React.Component {
    render() {

        let getData = () => {
            // REST calls should be placed here. Remember to use this.props.setData(dataFromRest) when data has been fetched
            
            // Just for testing
            setTimeout(() => {
                this.props.setData("tester")            
            }, 3000)
        }

        return (
            <div className="width-50p">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder={this.props.placeholder} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={() => getData()} >Search</button>
                    </div>
                </div>
            </div>
        )
    }
}
        
export default QueryOne