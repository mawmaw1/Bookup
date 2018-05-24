import React from 'react'

class DataTableThree extends React.Component {
    render() {
        if (this.props.data !== null && this.props.data.length > 0 && this.props.selectedQuery === "3") {
            let headers = Object.keys(this.props.data[0])
            return (
                <table className="table table-striped table-bordered table-dark">
                        <thead>
                            <tr>
                                <th className="width-50p">Book title</th>
                                <th className="width-50p">Cities Mentioned</th>
                            </tr>
                        </thead>
                        <tbody id = "query3Table">
                            {
                                this.props.data.map((d, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{d.title}</td>
                                            <td>
                                                {
                                                    d.cities.map((city, index) => {
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
                                })
                            }
                        </tbody>
                    </table>
            )
        }

        return <span></span>
    }
}

export default DataTableThree