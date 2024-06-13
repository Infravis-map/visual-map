import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  ImageOverlay,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { max } from "d3";

const baseMarkerSize = 40;

const nodes = [
  { id: 0, name: "Umeå University", position: [0.14, 0.14], size: 1.0, num: 0 },
  { id: 1, name: "Mid Sweden University", position: [0, 0], size: 1.0, num: 0 },
  {
    id: 2,
    name: "Uppsala University",
    position: [-0.355, 0.01],
    size: 0.7,
    num: 0,
  },
  {
    id: 3,
    name: "KTH Stockholm (KTH)",
    position: [-0.425, 0.023],
    size: 1.0,
    num: 0,
  },
  {
    id: 4,
    name: "Linköpings University",
    position: [-0.525, -0.1],
    size: 0.8,
    num: 0,
  },
  {
    id: 5,
    name: "Chalmers / Gothenburg University",
    position: [-0.62, -0.34],
    size: 1.0,
    num: 0,
  },
  { id: 6, name: "", position: [-0.62, -0.34], size: 0.0, num: 0 },
  {
    id: 7,
    name: "Linnaeus University (LNU)",
    position: [-0.77, -0.12],
    size: 1.0,
    num: 0,
  },
  {
    id: 8,
    name: "Lund University",
    position: [-0.86, -0.25],
    size: 1.0,
    num: 0,
  },
  // Add more nodes as needed
];



export default function Map({ projects, setProjects }) {
  const [map, setMap] = useState(null);
  const [showEdges, setShowEdges] = useState(true); // State variable to toggle edges
  const [edges, setEdges] = useState([]); // State for dynamic edges

  // Holding state of which marker is selected
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
  const markerRefs = useRef([]); // To store marker references

  useEffect(() => {
    GetNumInstitues();
    console.log(projects);
  }, [projects]);

  // function generateEdges(projects) {
  //   const edgeSet = new Set();

  //   projects.forEach((project) => {
  //     const { institute_ids } = project;
  //     for (let i = 0; i < institute_ids.length; i++) {
  //       for (let j = i + 1; j < institute_ids.length; j++) {
  //         const source = institute_ids[i];
  //         const target = institute_ids[j];
  //         const edge =
  //           source < target ? `${source}-${target}` : `${target}-${source}`;
  //         edgeSet.add(edge);
  //       }
  //     }
  //   });

  //   const edges = Array.from(edgeSet).map((edge) => {
  //     const [source, target] = edge.split("-").map(Number);
  //     return { source, target };
  //   });

  //   return edges;
  // }

  // useEffect(() => {
  //   if (projects) {
  //     const tmp_edges = generateEdges(projects);
  //     setEdges(tmp_edges);
  //   }
  // }, [projects]);

  function GetNumInstitues() {
    nodes.forEach((node) => (node.num = 0)); // Reset the counts

    // gets a number for how many projects per institute
    if (projects == null) {
      console.log("No projects");
      return;
    }
    for (let i = 0; i < projects.length; i++) {
      if (nodes[projects[i].Institute_id] != null) {
        // console.log(projects[i].Institute_id);
        nodes[projects[i].Institute_id].num++;
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      if (i == 5) {
        nodes[i].size = getLogMappedValue(
          nodes[i].num + nodes[i + 1].num,
          1,
          10
        );
      } else if (i == 6) {
        nodes[i].size = 0;
      } else {
        nodes[i].size = getLogMappedValue(nodes[i].num, 1, 10);
      }
    }
  }

  function getLogMappedValue(input, minInput, maxInput) {
    const minOutput = 0.3;
    const maxOutput = 1.0;

    // Ensure input is within the specified range
    if (input < minInput) input = minInput;
    if (input > maxInput) input = maxInput;

    const logMinInput = Math.log(minInput + 1);
    const logMaxInput = Math.log(maxInput + 1);
    const logInput = Math.log(input + 1);

    // Map the logarithmic value to the output range
    const mappedValue =
      minOutput +
      ((logInput - logMinInput) / (logMaxInput - logMinInput)) *
        (maxOutput - minOutput);

    return mappedValue;
  }

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
  const [zoomLevel, setZoomLevel] = useState(9);

  const handleZoomEnd = () => {
    setZoomLevel(map.getZoom());
  };

  useEffect(() => {
    if (map) {
      map.on("zoomend", handleZoomEnd);
    }

    return () => {
      if (map) {
        map.off("zoomend", handleZoomEnd);
      }
    };
  }, [map]);

  const fetchProjects = async (filterParams) => {
    const { search, level, startdate, enddate, institutes } = filterParams;

    const queryData = {
      q: search,
      priority: level,
      start_date: startdate,
      end_date: enddate,
      institute_id: institutes.join(","),
    };

    let queryString = new URLSearchParams();

    for (let key in queryData) {
      if (queryData[key] !== null && queryData[key] !== "") {
        queryString.append(key, queryData[key]);
      }
    }

    console.log(queryString.toString());

    try {
      const res = await fetch(`http://localhost:8080/filter?${queryString}`);
      console.log("filtered");

      const data = await res.json();
      console.log("after filtering, ", selectedMarkerIndex + 1);
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle marker click
  const handleMarkerClick = (index) => {
    if (selectedMarkerIndex === index) {
      setSelectedMarkerIndex(null);
    } else {
      console.log("Marker clicked: ", index);
      setSelectedMarkerIndex(index);
    }
  };

  useEffect(() => {
    if (selectedMarkerIndex !== null) {
      fetchProjects({
        search: "",
        level: "",
        startdate: "",
        enddate: "",
        institutes: [selectedMarkerIndex + 1], // Filtering by the selected institute
      });

      console.log("Filtering by institute: ", selectedMarkerIndex + 1);
    }
  }, [selectedMarkerIndex]);

  useEffect(() => {
    // console.log("SelectedMarkerIndex changed: ", ectedMarkerIndex);
    if (
      selectedMarkerIndex !== null &&
      markerRefs.current[selectedMarkerIndex]
    ) {
      markerRefs.current[selectedMarkerIndex].openPopup();
      console.log("Opening popup for marker: ", selectedMarkerIndex);
    }
    // Close other popups
    markerRefs.current.forEach((marker, index) => {
      if (index !== selectedMarkerIndex && marker) {
        marker.closePopup();
      }
    });
  }, [selectedMarkerIndex]);

  // Create an array to store dynamic markers
  const dynamicMarkers = nodes.map((node, index) => (
    <Marker
      key={node.id}
      position={node.position}
      icon={createIcon(
        color,
        baseMarkerSize * Math.pow(2, zoomLevel - 9) * node.size
      )}
      eventHandlers={{
        click: () => handleMarkerClick(index),
      }}
      opacity={selectedMarkerIndex === node.id ? 0.9 : 0.5}
      ref={(el) => (markerRefs.current[index] = el)}
    >
      <Popup>{node.name}</Popup>
    </Marker>
  ));

  const dynamicEdges = edges.map((edge, index) => (
    <Polyline
      weight={3}
      key={index}
      positions={[
        nodes.find((node) => node.id === edge.source).position,
        nodes.find((node) => node.id === edge.target).position,
      ]}
      color="#ef42f5"
      opacity={0.5}
    />
  ));

  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        center={[0, 0]}
        minZoom={9}
        zoom={9}
        maxZoom={12}
        attributionControl={false}
        className="map-container" // Added class here
        style={{ width: "100%" }}
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
        {dynamicMarkers}
        {showEdges && dynamicEdges} {/* Conditionally render edges */}
      </MapContainer>

      {/* Toggle button */}
      <button
        onClick={() => setShowEdges(!showEdges)}
        className="toggle-button"
      >
        {showEdges ? "Hide Edges" : "Show Edges"}
      </button>

      {/* Legends */}
      <div className="legend">
        <div className="legend-item">
          <div
            className="legend-icon"
            style={{
              backgroundColor: "#ef42f5",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
            }}
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
