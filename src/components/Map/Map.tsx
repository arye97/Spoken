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
    DEFAULT_MIN_ZOOM_LEVEL, DEFAULT_COUNTRY_STOPS, DEFAULT_MAX_ZOOM_LEVEL
} from "../../utils/constants";
import {CountryResponse, IMapControlButton, MapButtonGroups} from "../../utils/types";
import {useAppState} from "../../providers/AppState.provider";

interface MapProps {}

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?? '';

const Map = (props: MapProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const appState = useAppState();
    const languageContext = useLanguageSelection();
    const mapContainer = React.useRef<any>(null);
    const map = React.useRef<mapboxgl.Map | null>(null);

    const [canRotate, setCanRotate] = React.useState(true);
    const [triggerRotation, setTriggerRotation] = React.useState(true);

    const mapReset = () => {
        map.current?.flyTo({ center: [DEFAULT_LONGITUDE, DEFAULT_LATITUDE], essential: true, zoom: DEFAULT_MIN_ZOOM_LEVEL });
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

    const updateSideButtons = () => {
        const buttons: IMapControlButton[] = [
            {
                icon: 'add',
                callbackMethod: () => {
                    map.current?.zoomIn();
                }
            },
            {
                icon: 'remove',
                callbackMethod: () => {
                    map.current?.zoomOut();
                }
            },
            {
                icon: 'center_focus_strong',
                callbackMethod: () => {
                    mapReset();
                }
            }
        ];

        if (languageContext.selectedLanguage.name && languageContext.selectedSingleCountry.name) {
            buttons.push({
                icon: 'globe',
                callbackMethod: () => {
                    dyeCountriesByLanguage(languageContext.selectedLanguage.name);
                }
            });
        }
        appState.addMapButtonGroup(MapButtonGroups.MapControls, buttons);
    }

    useEffect(() => {
        updateSideButtons();
    }, [languageContext.selectedLanguage, languageContext.selectedSingleCountry]);

    /**
     * This hook runs at the initialisation of the component
     * Sets up the things the map needs to run including the map action buttons
     */
    useEffect(() => {
        if (map.current) return; // initialize map only once

        setIsLoading(true);

        updateSideButtons();

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [DEFAULT_LONGITUDE, DEFAULT_LATITUDE],
            zoom: DEFAULT_MIN_ZOOM_LEVEL,
            attributionControl: false,
            maxZoom: DEFAULT_MAX_ZOOM_LEVEL,
            minZoom: DEFAULT_MIN_ZOOM_LEVEL
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
                map.current?.easeTo({zoom: DEFAULT_MIN_ZOOM_LEVEL, essential: true, center: [newCenter.lng - EARTH_ROTATION_RATE, newCenter.lat]});
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

    const flyToSelectedCountry = (lat: number, lng: number, zoom: number) => {
        if (!map.current) return;
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
        flyToSelectedCountry(country.coords.lat, country.coords.lng, calculateZoom([country]));
    }

    const calculateZoom = (country: CountryResponse[]): number => {
        return 4;
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
            const center = findCenterOfCountries(countries);
            flyToSelectedCountry(center.lat, center.lng, calculateZoom(countries));
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
            <div className={styles['spinner']}>
                { isLoading ? <LoadingSpinner /> : null }
            </div>
            <div className={styles['mapContainer']} ref={mapContainer} />
        </div>
    );
}

export default Map;
