import { useEffect } from "react";
import L, { LatLng } from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";


export const Routing = ({start, end}: RoutingPropTypes) =>  {
  const map = useMap();

//ts-ignore is needed because @types/leaflet-routing-machine does not provide correct types for the latest version of routing-machine
  useEffect(() => {
    if (map) {
      const routingControl = L.Routing.control({
        waypoints: [start, end],
        routeWhileDragging: false,
        addWaypoints: false,
        //@ts-ignore
        createMarker: () => (null),
        //@ts-ignore
        language: 'ru'
      }).addTo(map);

      return () => map.removeControl(routingControl);
    };
    return () => {};
  }, [map, start, end]);

  return null;
}

type RoutingPropTypes = {
  start: LatLng;
  end: LatLng;
}