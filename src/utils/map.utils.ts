import {CountryResponse} from "./types";


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
