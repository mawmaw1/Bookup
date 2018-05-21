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
                    <table className="table table-striped table-bordered table-dark">
                        <thead>
                            <tr>
                                <th className="width-50p">Book title</th>
                                <th className="width-50p">Author(s) name(s) <span className="float-right not-fat">{this.props.amount} matches - Showing: {this.state.limit}</span> </th>
                            </tr>
                        </thead>
                        <tbody id='rowtbody' >
                            {
                                this.props.data.map((d, index) => {
                                    if (index <= this.state.limit) {
                                        return (
                                            <tr key={index}>
                                                <td>{d.title}</td>
                                                <td>
                                                    {
                                                        d.authors && d.authors.map((author, index) => {
                                                            if(index === d.authors.length -1 ) {
                                                                return <span key={index}>{author}</span>
                                                            } else {
                                                                return <span className="dis-block" key={index}>{author}</span>
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

export default DataTableOne