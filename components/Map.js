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
  { id: 0, name: "Umeå University", position: [0.14, 0.14], size: 1.0 },
  { id: 1, name: "Mid Sweden University", position: [-0, 0], size: 1.0 },
  { id: 2, name: "Uppsala University", position: [-0.355, 0.01], size: 0.7 },
  { id: 3, name: "KTH Stockholm", position: [-0.425, 0.023], size: 1.0 },
  { id: 4, name: "Linköpings University", position: [-0.525, -0.1], size: 0.8 },
  { id: 5, name: "Chalmers / Gothenburg University", position: [-0.62, -0.34], size: 1.0 },
  { id: 6, name: "", position: [-0.62, -0.34], size: 0.0 },
  { id: 7, name: "Linnaeus University", position: [-0.77, -0.12], size: 1.0 },
  { id: 8, name: "Lund University", position: [-0.86, -0.25], size: 1.0 },
  // Add more nodes as needed
];

const edges = [
  { source: 0, target: 1 },
  { source: 1, target: 2 },
  { source: 2, target: 3 },
  { source: 3, target: 4 },
  { source: 4, target: 5 },
  { source: 5, target: 6 },
  { source: 6, target: 7 },
  { source: 7, target: 0 },
  { source: 0, target: 2 },
  { source: 2, target: 4 },
  { source: 4, target: 6 },
  { source: 6, target: 0 }
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
        popupAnchor: [0, -size / 2],
      });
    }

    const color = "#ef42f5";

    // Holding state of which marker is selected
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);

    // Function to handle marker click
    const handleMarkerClick = (index) => {
      console.log("Marker clicked: ", index);
      if (selectedMarkerIndex === index) {
        setSelectedMarkerIndex(null);
        return;
      }
      setSelectedMarkerIndex(index);
    };

    const [zoomLevel, setZoomLevel] = useState(9);

    const handleZoomEnd = () => {
      // console.log("Zoom level: ", map.getZoom());
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
        {/* {selectedMarkerIndex === node.id && ( */}
          <Popup className="custom-popup">
            {node.name}
          </Popup>
        {/* )} */}
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
      {/* Legends */}
      <div className="legend">
        <div className="legend-item">
          <div
            className="legend-icon"
            style={{ backgroundColor: "#ef42f5", width: "20px", height: "20px", borderRadius: "50%" }}
          ></div>
          <div className="legend-label">University</div>
        </div>
        <div className="legend-item">
          <div
            className="legend-line"
            style={{ backgroundColor: "#ef42f5", width: "40px", height: "2px" }}
          ></div>
          <div className="legend-label">Connections</div>
        </div>
        {/* Add more legend items as needed */}
      </div>
    </div>
  );
}
