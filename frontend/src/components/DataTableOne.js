import React from 'react'

class DataTableOne extends React.Component {
    constructor (props) {
        super(props);
        this.state = { limit: 100 };
    }

    expandLimit() {
        let newLimit = this.state.limit += 100
        this.setState({limit: newLimit})
    }

    render() {
        if (this.props.data !== null && this.props.selectedQuery === "1") {
            return (
                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="width-50p">Book title</th>
                                <th className="width-50p">Author name <span className="float-right not-fat">{this.props.amount} matches - Showing: {this.state.limit}</span> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.data.map((d, index) => {
                                    if (index <= this.state.limit) {
                                        return (
                                            <tr key={index}>
                                                <td>{d.title}</td>
                                                <td>{d.name}</td>
                                            </tr>
                                        )
                                    }
                                    return <tr key={index} className="noshow"></tr>
                                })
                            }
                        </tbody>
                    </table>
                    <div className="center">
                        <button className="btn btn-primary" onClick={() => this.expandLimit()}>Load more data</button>
                    </div>
                </div>
            )
        }

        return <span></span>
    }
}

export default DataTableOne