import React from 'react'

class DataTable extends React.Component {
    render() {
        if (this.props.data !== null) {
            let headers = Object.keys(this.props.data[0])
            console.log(headers)
            return (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            {
                                headers.map((h, index) => {
                                    return <th key={index}>{h}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.map((d, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{d.cityid}</td>
                                        <td>{d.name}</td>
                                        <td>{d.latitude}</td>
                                        <td>{d.longitude}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )
        }

        return <span>No data</span>
    }
}

export default DataTable