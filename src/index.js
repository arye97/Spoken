import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import SearchBox from "./searchbox";
import '../src/index.css';


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
                <div style={{
                    width:'30%',
                    paddingTop: '1%',
                    paddingLeft: '1.5%',
                    marginRight: '-10.5%',
                    float: 'left',
                    display: 'inline-flex',
                    backgroundColor: 'whitesmoke',
                    margin: '2.5%',
                    borderRadius: '30px'
                   }}>
                    <h2 style={{
                        fontFamily: 'Vegan',
                        fontSize: 'xxx-large',
                        padding: '0.5%',
                        margin: '10px',
                        marginTop: '-1px'
                    }}>Spoken</h2>
                    <div style={{
                        padding: '2.5%',
                        margin: '1.5%',
                        marginTop:'1.5%',
                        width: '60%'
                    }}>
                        <SearchBox />
                    </div>
                </div>
                <div ref={el => this.mapContainer = el}
                    style={{
                        zIndex: -10,
                        position: 'fixed',
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