import Geocode from 'react-geocode';
import { Location } from '../types/types';

Geocode.setLanguage('ru');

export const getAddressFromCoords = ({coords}: {coords: Location}): Promise<string> | string => {
    const { lat, lng } = {lat: String(coords.lat), lng: String(coords.lng)};
    try {
        const address = Geocode.fromLatLng(lat, lng);
        console.log(address);
        
        return address;
    } catch (err) {
        console.log(err);
    }
    return 'ERROR'
}