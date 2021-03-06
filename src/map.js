import React from 'react';
import mapboxgl from 'mapbox-gl';
import '../src/index.css';
import {Dropdown} from "semantic-ui-react";
import '../src/index.css';
import 'semantic-ui-css/semantic.min.css';
import axios from "axios";
import {languageOptions} from '../src/constants';

import IntroModal from "./introModal"; // Import css

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ5ZTk3IiwiYSI6ImNra3A2Nmx4aDA1cm8ycW55OGRsb3c3aGgifQ.lSJZo_t8Ya7KFWQJynPVmQ';

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lng: this.props.lng,
            lat: this.props.lat,
            zoom: 0,
            showDialog: true
        };
        this.map = null;
    }

    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        this.map.on('move', () => {
            this.setState({
                lng: this.map.getCenter().lng.toFixed(4),
                lat: this.map.getCenter().lat.toFixed(4),
                zoom: this.map.getZoom().toFixed(2)
            });
        });

    }

    /**
     * Needs to be a
     * @param language (the ISO code)
     * @returns {Promise<any>} the countries data - all countries return data
     */
    async getLanguageCountries(language) {
        let url = 'https://restcountries.eu/rest/v2/lang/' + language;
        let currentCountryInfo = await axios.get(url).catch((e) => {return null});
        console.log(currentCountryInfo);
        return (currentCountryInfo ? currentCountryInfo.data : null);
    }

    findLanguageISO(language) {
        let i = 0;
        for (i = 0; i < languageOptions.length; i++) {
            if (languageOptions[i].text === language) {
                return languageOptions[i].key;
            }
        }
    }

    panToCountry(zoom) {
        this.map.flyTo({
            center: [
                this.state.lng, this.state.lat
            ],
            zoom : zoom,
            essential: true
        });
    }

    /**
     * Find the center of the countries that speak the language
     * @param countryData
     * @returns {number[]}
     */
    findMiddleGround(countryData) {
        let x = 0.0;
        let y = 0.0;
        let z = 0.0;
        for (let i = 0; i < countryData.length; i++) {
            let latitude = countryData[i].latlng[0] * Math.PI / 180;
            let longitude = countryData[i].latlng[1] * Math.PI / 180;
            let nx = x + Math.cos(latitude) * Math.cos(longitude);
            let ny = y + Math.cos(latitude) * Math.sin(longitude);
            let nz = z + Math.sin(latitude);
            if (!isNaN(nx) && !isNaN(ny) && !isNaN(nz)) {
                x = nx;
                y = ny;
                z = nz;
            } else {
                break;
            }
        }

        let total = countryData.length;
        x = x / total;
        y = y / total;
        z = z / total;
        let centralLongitude = Math.atan2(y, x);
        let centralSquareRoot = Math.sqrt(x * x + y * y);
        let centralLatitude = Math.atan2(z, centralSquareRoot);
        let ty = [centralLatitude * 180 / Math.PI, centralLongitude * 180 / Math.PI];

        this.setState({lat: centralLatitude * 180 / Math.PI, lng:  centralLongitude * 180 / Math.PI})
        return ty;

    }

    dyeCountries(countryData, language) {
        let countryStops = ["in",
            "iso_3166_1_alpha_3"]
        for (let i = 0; i < countryData.length; i++) {
            if (countryData[i].name !== 'Antarctica') {
                countryStops.push(countryData[i].alpha3Code);
            }
        }
        console.log(countryStops);
        //this line is stupid but necessary
        if (this.map.getLayer('country-boundaries') || this.map.getSource('country-boundaries')) { this.map.removeLayer('country-boundaries'); this.map.removeSource('country-boundaries')}

        if (this.map.getLayer('country-boundaries') === undefined) {
            this.map.addLayer(
                {
                    id: 'country-boundaries',
                    source: {
                        type: 'vector',
                        url: 'mapbox://mapbox.country-boundaries-v1',
                    },
                    'source-layer': 'country_boundaries',
                    type: 'fill',
                    paint: {
                        'fill-color': '#d2361e',
                        'fill-opacity': 0.4,
                    },
                },
                'country-label'
            );

            this.map.setFilter('country-boundaries', countryStops);

        }
    }

    async getCountryWikiInfo(countryData) {
        let allCountries = [];
        for (let i = 0; i < countryData.length; i++) {
            let url = 'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=' + countryData[i].name;
            let currentCountryInfo = await axios.get(url, {
                method: 'GET'
            });
            let keys =  Object.keys(currentCountryInfo.data.query.pages)[0];
            allCountries.push(currentCountryInfo.extract);
        }
        return allCountries;
    }

    // addInfoWindows(countries) {
    //     console.log(countries);
    //     for (let i = 0; i < countries.length; i++) {
    //
    //         console.log(countries[i]);
    //         let countryLatLng = {lat: countries[i].latlng[0],
    //                              lng: countries[i].latlng[1]};
    //
    //         let popup = new mapboxgl.Popup({
    //             closeButton: false,
    //             closeOnClick: false,
    //             layout: {
    //                 'icon-image': 'custom-marker',
    //                 'icon-allow-overlap': true
    //             }
    //         });
    //
    //         this.map.on('mouseenter', 'country_boundaries', function (e) {
    //             let description = "<strong>Truckeroo</strong><p>Test</p>";
    //             popup.setLngLat(countryLatLng).setHTML(description).addTo(this.map);
    //         });
    //         this.map.loadImage(
    //             'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
    //             function (error, image) {
    //                 if (error) throw error;
    //                 this.map.addImage('custom-marker', image);});
    //
    //     }
    // }

    async dropdownOnChange(e, options) {
        let isoCode = this.findLanguageISO(e.target.textContent);
        let countries = await this.getLanguageCountries(isoCode);

        if (countries != null) {
            if (countries.length > 1) {
                this.dyeCountries(countries);
                this.findMiddleGround(countries);
                let zoom = 4;
                if (countries.length > 5) {
                    zoom = 2.5;
                }
                this.panToCountry(zoom);
            } else {
                this.dyeCountries(countries);
                let latlng = countries[0].latlng;
                this.setState({lng: latlng[1], lat: latlng[0]})
                this.panToCountry(6);
            }
            this.addInfoWindows(countries);
        } else {
            Dropdown.text = "Can't find country";
        }

    }

    render() {
        return (
            <div>
                <div className={'searchBoxParent'}>
                    <h2 className={'titleSpoken'}>Spoken</h2>
                    <div className={'searchBox'} id={'searchBox'}>
                        <IntroModal />
                        <br/>
                        <hr/>

                        <Dropdown
                            id={'languageOptions'}
                            button
                            className='icon'
                            floating
                            labeled
                            icon='world'
                            options={languageOptions}
                            search
                            placeholder="Select Language"
                            text={Dropdown.text}
                            onChange={async (e, {value}) => {
                                await this.dropdownOnChange(e, value);
                            }}
                        />
                    </div>

                </div>
                <div ref={el => this.mapContainer = el}
                     className={'mapContainer'}
                />



            </div>
        )
    }
}

export default Map;