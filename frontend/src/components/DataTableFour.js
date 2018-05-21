import React from 'react'

class DataTableFour extends React.Component {
    constructor (props) {
        super(props);
        this.state = { limit: 10 };
    }

    expandLimit() {
        let newLimit = this.state.limit += 10
        this.setState({limit: newLimit})
    }

    render() {
        if (this.props.data !== null && this.props.data.length > 0 && this.props.selectedQuery === "4") {
            return (
                <div>
                    <table className="table table-striped table-bordered table-dark">
                        <thead>
                        <tr>
                                <th className="width-50p">Book title</th>
                                <th className="width-50p">Cities mentioned <span className="float-right not-fat">{this.props.amount} matches - Showing: {this.state.limit}</span> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.data.map((d, index) => {
                                    if (index <= this.state.limit) {
                                        return (
                                            <tr key={index}>
                                                <td>{d.title}</td>
                                                <td>
                                                    {
                                                        d.cities && d.cities.map((city, index) => {
                                                            if(index === d.cities.length -1 ) {
                                                                return <span key={index}>{city.name}</span>
                                                            } else {
                                                                return <span className="dis-block" key={index}>{city.name}</span>
                                                            }
                                                        })
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </table>
                    <div className="center margin-bottom-20px">
                        <button className="btn btn-primary" onClick={() => this.expandLimit()}>Load more data</button>
                    </div>
                </div>
            )
        }

        return <span></span>
    }
}

export default DataTableFour