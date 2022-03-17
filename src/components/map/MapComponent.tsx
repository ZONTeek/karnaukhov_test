import { MapContainer as Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Routing } from './Routing'
import { startIcon, endIcon } from './markers'

import { LatLng } from 'leaflet'
import { CurrentOrder } from '../../types/types'

const defaultLocation = {lat: 55.57, lng: 38.149}
const mapOffset = {latOffset: -0.8, lngOffset: -0.4}

export const MapComponent = ({currentOrder}: MapComponentProps): JSX.Element => {

    const { lat, lng } = currentOrder ? 
    {   lat: currentOrder.startAddress.coords.lat + mapOffset.latOffset, 
        lng: currentOrder.startAddress.coords.lng + mapOffset.lngOffset
    }  : defaultLocation
    
    
    return <div className="wrapper">
        <div className='map-container'>
        <Map className={'leaflet'}
            center={[lat, lng]} 
            zoom={10}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                { currentOrder && <><Marker position={currentOrder.startAddress.coords} icon={startIcon} >
                    <Popup>
                        Начальная точка <br />
                        {currentOrder.order.description}
                    </Popup>
                </Marker>
                <Marker position={currentOrder.finishAddress.coords} icon={endIcon} >
                    <Popup>
                        Конечная точка <br />
                        {currentOrder.order.description}
                    </Popup>
                </Marker>
                <Routing  start={currentOrder.startAddress.coords as LatLng} end={currentOrder.finishAddress.coords as LatLng} />
                </>}
            </Map>
        </div>
    </div>
}

type MapComponentProps = {
    currentOrder: CurrentOrder | undefined;
}