import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class CityMap extends React.Component {
    render() {
        let data = this.props.data ? this.props.data : []
        const CityMapInner = withScriptjs(withGoogleMap((props) =>
            <GoogleMap defaultZoom={3} defaultCenter={{ lat: 0, lng: 0 }}>
                {
                    data.map((mark, index) => {
                        return <Marker key={index} position={{lat: mark.latitude, lng: mark.longitude}} />
                    })
                }
            </GoogleMap>
        ))
        if (this.props.data && this.props.data.length > 0 && this.props.selectedQuery === "2") {
            return (
                <CityMapInner
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `1000px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            )
        }
        return <span></span>
    }
}




export default CityMap