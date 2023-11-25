import React, {useEffect, useState} from 'react';
import styles from './Map.module.scss';
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {useLanguageSelection} from "../../providers/LanguageStore.provider";
import {findCenterOfCountries} from "../../utils/map.utils";
import {
    EARTH_ROTATION_RATE,
    DEFAULT_LATITUDE,
    DEFAULT_LONGITUDE,
    DEFAULT_SELECT_VALUE,
    DEFAULT_ZOOM_LEVEL, DEFAULT_COUNTRY_STOPS
} from "../../utils/constants";
import MapButtons from "../MapButtons/MapButtons";
import {CountryResponse, IMapControlButton} from "../../utils/types";

interface MapProps {}

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?? '';

const Map = (props: MapProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const languageContext = useLanguageSelection();
    const mapContainer = React.useRef<any>(null);
    const map = React.useRef<mapboxgl.Map | null>(null);

    const [lng, setLng] = React.useState(DEFAULT_LONGITUDE);
    const [lat, setLat] = React.useState(DEFAULT_LATITUDE);
    const [zoom, setZoom] = React.useState(DEFAULT_ZOOM_LEVEL);

    const [canRotate, setCanRotate] = React.useState(true);
    const [triggerRotation, setTriggerRotation] = React.useState(true);
    const [mapControlButtons, setMapControlButtons] = React.useState<IMapControlButton[]>([]);

    const mapReset = () => {
        map.current?.easeTo({ center: [DEFAULT_LONGITUDE, DEFAULT_LATITUDE], essential: true, zoom: DEFAULT_ZOOM_LEVEL });
        // resetMapDataSources();
        setCanRotate(true);
        setTriggerRotation(true);
    }

    const resetMapDataSources = () => {
        if (!map.current) return;
        if (map.current.getLayer('country-boundaries') || map.current.getSource('country-boundaries')) {
            map.current.removeLayer('country-boundaries');
            map.current.removeSource('country-boundaries');
        }
    }

    /**
     * This hook runs at the initialisation of the component
     * Sets up the things the map needs to run including the map action buttons
     */
    useEffect(() => {
        if (map.current) return; // initialize map only once

        setIsLoading(true);
        let buttons: IMapControlButton[] = [{
            icon: 'add',
            callbackMethod: () => {
                map.current?.zoomIn();
            }
        }, {
            icon: 'remove',
            callbackMethod: () => {
                map.current?.zoomOut();
            }
        }, {
            icon: 'center_focus_strong',
            callbackMethod: () => {
                mapReset();
            }
        }
        ];
        setMapControlButtons(buttons)

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
            attributionControl: false,
            maxZoom: 8,
            minZoom: DEFAULT_ZOOM_LEVEL
        });

        map.current.once('load', () => {
            dyeCountriesByLanguage(languageContext.selectedLanguage.name);
            setIsLoading(false);
        });

        map.current.on('drag', () => {
            setCanRotate(false);
        });

        map.current.on('zoom', () => {
            setCanRotate(false);
        });
    }, []);

    useEffect(() => {
        rotateEarth();
    }, [triggerRotation]);

    const rotateEarth = () => {
        if (!map.current) return;
        setTimeout(() => {
            if (map.current && canRotate) {
                const newCenter = map.current?.getCenter();
                map.current?.easeTo({zoom: DEFAULT_ZOOM_LEVEL, essential: true, center: [newCenter.lng - EARTH_ROTATION_RATE, newCenter.lat]});
            }
            setTriggerRotation(!triggerRotation);
        }, 50);
    }

    useEffect(() => {
        if (!languageContext.selectedLanguage.name) return;
        if (languageContext.selectedLanguage.name === DEFAULT_SELECT_VALUE) {
            mapReset();
            return;
        }
        setCanRotate(false);
        if (map.current?.loaded() && languageContext.selectedLanguage.name) {
            dyeCountriesByLanguage(languageContext.selectedLanguage.name);
        }
    }, [languageContext.selectedLanguage]);

    const flyToSelectedCountry = (lat: number, lng: number, countryCount: number) => {
        if (!map.current) return;
        let zoom = 4;
        if (countryCount > 5) {
            zoom = 2.5;
        }
        map.current?.flyTo({ center: [lng, lat], essential: true, zoom })
            .on('moveend', () => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        if (languageContext.selectedSingleCountry.coords) {
            dyeCountry(languageContext.selectedSingleCountry);
        }
    }, [languageContext.selectedSingleCountry])

    const dyeCountry = (country: CountryResponse) => {
        if (!map.current) return;
        const countryStops = [...DEFAULT_COUNTRY_STOPS, country.cca3];
        map.current?.setFilter('country-boundaries', countryStops);
        flyToSelectedCountry(country.coords.lat, country.coords.lng, 1);
    }

    const dyeCountriesByLanguage = (language: string) => {
        if (!map.current || !language || language === DEFAULT_SELECT_VALUE) return;

        const countryStops = [...DEFAULT_COUNTRY_STOPS];

        setIsLoading(true);

        languageContext.getCountriesForLanguage(language).then((countries) => {
            countries.forEach(country => {
                countryStops.push(country.cca3);
            });
            map.current?.setFilter('country-boundaries', countryStops);
            // setIsLoading(false);
            const center = findCenterOfCountries(countries);
            flyToSelectedCountry(center.lat, center.lng, countries.length);
        });

        resetMapDataSources();

        if (map.current.getLayer('country-boundaries') === undefined) {
            map.current.addLayer(
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
                        'fill-opacity': 0.5,
                    }
                },
                'country-label'
            );
        }

        map.current.setFilter('country-boundaries', countryStops);
    }

    return (
        <div>
            <div className={styles['mapControlButtons']}>
                <MapButtons buttons={mapControlButtons} />
            </div>
            <div className={styles['spinner']}>
                { isLoading ? <LoadingSpinner /> : null }
            </div>
            <div className={styles['mapContainer']} ref={mapContainer} />
        </div>
    );
}

export default Map;
