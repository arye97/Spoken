import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';
import Map from "./map";
import 'semantic-ui-css/semantic.min.css'



class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2
        };
    }

    render() {
        return (
            <div>
               <Map lat={this.state.lat} lng={this.state.lng} />
            </div>
        )
    }
}

ReactDOM.render(<Application />, document.getElementById('app'));