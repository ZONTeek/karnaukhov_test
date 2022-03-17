import L from 'leaflet';

const startMarkerHtmlStyles = `
  background-color: blue;
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  left: -0.8rem;
  top: -1.0rem;
  position: relative;
  border-radius: 1rem 1.2rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

const endMarkerHtmlStyles = `
  background-color: red;
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  left: -0.8rem;
  top: -1.0rem;
  position: relative;
  border-radius: 1rem 1.2rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

export const startIcon = L.divIcon({
  className: "my-custom-pin",
  iconAnchor: [0, 24],
  popupAnchor: [0, -36],
  html: `<span style="${startMarkerHtmlStyles}" />`
});

export const endIcon = L.divIcon({
  className: "my-custom-pin",
  iconAnchor: [0, 24],
  popupAnchor: [0, -36],
  html: `<span style="${endMarkerHtmlStyles}" />`
});

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});