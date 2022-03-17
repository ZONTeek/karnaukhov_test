import { useSelector } from 'react-redux';
import { MapComponent } from './MapComponent';
import { selectCurrentOrder } from '../../store/OrderSlice';

import './styles.css'
import 'leaflet/dist/leaflet.css'


export const MapContainer = (): JSX.Element => {
    const currentOrder = useSelector(selectCurrentOrder);
    
    return (
        <MapComponent currentOrder={currentOrder} />
    )
}
