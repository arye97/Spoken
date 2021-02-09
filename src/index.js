import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import SearchBox from "./searchbox";

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ5ZTk3IiwiYSI6ImNra3A2Nmx5dTFtZWQyd29jbDE1c2M1a3gifQ.oTlYhKLVFhPHU17SffuotQ';


class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        map.once('move', () => {

            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }

    render() {
        return (
            <div>
                <div style={{width:'25%'}}>
                    <SearchBox/>
                </div>
                <div ref={el => this.mapContainer = el}
                     style={{
                         position: 'relative',
                         top: 0,
                         bottom: 0,
                         padding:0,
                         margin:0,
                         width: '100%',
                         height: '98vh',
                     }}
                />
            </div>
        )
    }
}

ReactDOM.render(<Application />, document.getElementById('app'));