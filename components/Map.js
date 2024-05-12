import { useEffect, useState, useRef, createRef } from "react";
import {
  MapContainer,
  ImageOverlay,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { DivIcon, LatLngExpression, Layer } from "leaflet";
import "leaflet/dist/leaflet.css";

const baseMarkerSize = 30;

const nodes = [
  { id: 1, position: [0.14, 0.14], size: 1.0 },
  { id: 2, position: [-0, 0], size: 1.0 },
  { id: 3, position: [-0.355, 0.01], size: 0.7 },
  { id: 4, position: [-0.425, 0.023], size: 1.0 },
  { id: 5, position: [-0.525, -0.1], size: 0.2 },
  { id: 6, position: [-0.62, -0.34], size: 1.0 },
  { id: 7, position: [-0.77, -0.12], size: 1.0 },
  { id: 8, position: [-0.86, -0.25], size: 1.0 },
  // Add more nodes as needed
];

const edges = [
  { source: 1, target: 2 },
  { source: 1, target: 3 },
  { source: 1, target: 4 },
  { source: 1, target: 5 },
  { source: 1, target: 6 },
  { source: 1, target: 7 },
  { source: 1, target: 8 },
  { source: 2, target: 3 },
  { source: 3, target: 4 },
  { source: 4, target: 5 },
  { source: 5, target: 6 },
  { source: 6, target: 7 },
  { source: 7, target: 8 },
  { source: 2, target: 3 },
  { source: 3, target: 4 },
  { source: 4, target: 5 },
  { source: 5, target: 6 },
  { source: 6, target: 7 },
  { source: 7, target: 8 },
  // Add more edges as needed
];

export default function Map() {
  const [map, setMap] = useState(null);

  // Define a functional component to render dynamic markers
  function DynamicMarkers() {
    // Define an array of marker positions

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

    // Holding state of which marker is selected
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);

    // Function to handle marker click
    const handleMarkerClick = (index) => {
      setSelectedMarkerIndex(index);
    };

    const [zoomLevel, setZoomLevel] = useState(9);

    const handleZoomEnd = () => {
      console.log("Zoom level: ", map.getZoom());
      setZoomLevel(map.getZoom());
    };

    useEffect(() => {
      console.log("Map instance: ", map);
      if (map) {
        map.on("zoomend", handleZoomEnd);
      }

      return () => {
        if (map) {
          map.off("zoomend", handleZoomEnd);
        }
      };
    }, []);

    // Create an array to store dynamic markers
    const dynamicMarkers = nodes.map((node) => (
      <Marker
        key={node.id}
        position={node.position}
        icon={createIcon(
          color,
          baseMarkerSize * Math.pow(2, zoomLevel - 9) * node.size
        )}
        eventHandlers={{
          click: () => handleMarkerClick(node.id),
        }}
        opacity={selectedMarkerIndex === node.id ? 0.9 : 0.5}
      >
        {/* <Popup>ok. hello</Popup> */}
      </Marker>
    ));

    return dynamicMarkers;
  }

  function DynamicEdges() {
    const dynamicEdges = edges.map((edge, index) => (
      <Polyline
        weight={2}
        key={index}
        positions={[
          nodes.find((node) => node.id === edge.source).position,
          nodes.find((node) => node.id === edge.target).position,
        ]}
        color="#ef42f5"
      />
    ));

    return dynamicEdges;
  }

  return (
    <div>
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
        ref={setMap}
      >
        <ImageOverlay
          url="se.svg"
          bounds={[
            [-1, -1],
            [1, 1],
          ]}
        />
        <DynamicMarkers />
        <DynamicEdges />
      </MapContainer>

      {/* Legends */}
      <div className="legend">
        <div className="legend-item">
          <div
            className="legend-icon"
            style={{ backgroundColor: "blue" }}
          ></div>
          <div className="legend-label">Marker 1</div>
        </div>
        {/* Add more legend items as needed */}
      </div>
    </div>
  );
}
