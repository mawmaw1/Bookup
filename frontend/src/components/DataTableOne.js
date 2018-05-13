import React from 'react'

class DataTableOne extends React.Component {
    render() {
        if (this.props.data !== null && this.props.selectedQuery === "1") {
            return (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Book title</th>
                            <th>Author name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.map((d, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{d.title}</td>
                                        <td>{d.name}</td>
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

export default DataTableOne