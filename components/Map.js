import { useEffect, useState, useRef, createRef } from "react";
import { MapContainer, ImageOverlay, TileLayer, Marker, Popup } from "react-leaflet";
import { DivIcon, LatLngExpression, Layer } from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  return (
    <MapContainer
        center={[0, 0]}
        minZoom={9}
        zoom={9}
        maxZoom={12}
        attributionControl={false}
        style={{height: '100vh', width: '100%'}}
    >
        <ImageOverlay url="se.svg" bounds={[[-1, -1], [1, 1]]}/>
    </MapContainer>
  );
}