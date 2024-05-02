import { useEffect, useState, useRef, createRef } from "react";
import {
  MapContainer,
  ImageOverlay,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import { DivIcon, LatLngExpression, Layer } from "leaflet";
import "leaflet/dist/leaflet.css";

// Define a functional component to render dynamic markers
function DynamicMarkers() {
  // Define an array of marker positions
  const markerPositions = [
    [0.14, 0.14],
    [-0, 0],
    [-0, 0],
    [-0, 0],
    [-0, 0],
    [-0, 0],
    [-0, 0],
    [-0.77, -0.12],
    [-0.86, -0.25],
  ];

  function createIcon(color, size) {
    return L.divIcon({
      className: "custom-div-icon",
      html: `
    <svg xmlns='http://www.w3.org/2000/svg'
      width='${size}'
      height='${size}'
      viewBox='0 0 24 24'
      fill='${color}'
      stroke-width='0'
      stroke-linecap='round'
      stroke-linejoin='round'>
      <circle
        cx='12'
        cy='12'
        r='10'
      />
    </svg>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [-3, -76],
    });
  }

  const color = "#ef42f5";
  const size = 10;

  // Create an array to store dynamic markers
  const dynamicMarkers = markerPositions.map((position, index) => (
    <Marker key={index} position={position} icon={createIcon(color, size)}>
      <Popup>ok. hello</Popup>
    </Marker>
  ));

  return dynamicMarkers;
}

export default function Map() {

  return (
    <MapContainer
      center={[0, 0]}
      minZoom={9}
      zoom={9}
      maxZoom={12}
      attributionControl={false}
      style={{ height: "100vh", width: "100%" }}
      maxBounds={[
        [-1, -1],
        [1, 1],
      ]} // Limit panning to these bounds
      maxBoundsViscosity={0.95} // How solid the bounds are when user tries to pan outside
    >
      <ImageOverlay
        url="se.svg"
        bounds={[
          [-1, -1],
          [1, 1],
        ]}
      />
      <DynamicMarkers />
    </MapContainer>
  );
}
