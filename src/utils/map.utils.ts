import {CountryResponse} from "./types";
import mapboxgl, {LngLatBounds} from "mapbox-gl";


/**
 * Find the center of the countries that speak the language
 * @param countryData
 * @returns { lat: number, lng: number } coordinates of the geographic center of countries
 */
export const findCenterOfCountries = (countryData: CountryResponse[]): { lat: number, lng: number } => {
    let x = 0.0;
    let y = 0.0;
    let z = 0.0;
    countryData.forEach(country => {
        let latitude = country.coords.lat * Math.PI / 180;
        let longitude = country.coords.lng * Math.PI / 180;
        let nx = x + Math.cos(latitude) * Math.cos(longitude);
        let ny = y + Math.cos(latitude) * Math.sin(longitude);
        let nz = z + Math.sin(latitude);
        if (!isNaN(nx) && !isNaN(ny) && !isNaN(nz)) {
            x = nx;
            y = ny;
            z = nz;
        }
    });

    const total = countryData.length;
    x = x / total;
    y = y / total;
    z = z / total;

    const centralLongitude = Math.atan2(y, x);
    const centralSquareRoot = Math.sqrt(x * x + y * y);
    const centralLatitude = Math.atan2(z, centralSquareRoot);

    return {
        lat: centralLatitude * 180 / Math.PI,
        lng: centralLongitude * 180 / Math.PI
    };

}

export const multiCSSHandler = (classes: string[], styles: any) => {
    return classes.map((cssClass: string) => {
        return styles[cssClass]
    }).join(' ');
}


export const goToUrl = (url: string) => {
    window.open(url, "_blank");
}

export const getBoundsOfCountries = (countries: CountryResponse[]): LngLatBounds => {
    const coords = countries.map(country => new mapboxgl.LngLat(country.coords.lng, country.coords.lat));

    const southWestLat = Math.max(Math.min(...coords.map(coord => coord.lat)) - 10, -90);
    const southWestLng = Math.max(Math.min(...coords.map(coord => coord.lng)) - 10, -90);

    const northEastLat = Math.min(Math.max(...coords.map(coord => coord.lat)) + 10, 90);
    const northEastLng = Math.min(Math.max(...coords.map(coord => coord.lng)) + 10, 90);

    const southWestBounds = new mapboxgl.LngLat(southWestLng, southWestLat);
    const northEastBounds = new mapboxgl.LngLat(northEastLng, northEastLat);


    return new mapboxgl.LngLatBounds(southWestBounds, northEastBounds);
}
