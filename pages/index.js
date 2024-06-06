import Head from "next/head";
import styles from "../styles/Home.module.css";
import Project from "../components/Project";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import fetch from "isomorphic-unfetch";

const Map = dynamic(() => import("../components/Map.js"), { ssr: false });

export async function getServerSideProps() {
  // Change to getServerSideProps to run on each request
  try {
    // const res = await fetch("http://localhost:8080/filter");
    const res = await fetch("http://app:8080/filter");
    const data = await res.json();
    return {
      props: {
        projects: data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        projects: [],
      },
    };
  }
}

export default function Home({ projects: initialProjects }) {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [projects, setProjects] = useState(initialProjects);
  // const [projects, setProjects] = useState([
  //     {title:"Visualizing Buzz Pollination", institute_id: 3, coordinator:"Mario Romero Vega", image:null, link: "https://infravis.se/visualizing-buzz-pollination/"},
  //     {title:"SEAD Conservation Paleobiology", institute_id: 0, coordinator:"Roger Mähler", image:null, link: "https://infravis.se/sead-conservation-paleobiology/"},
  //     {title:"Producing And Rendering A 3D Mesh Of Cassida Viridis – Green Tortoise Beetle", institute_id: null, coordinator:"Mario Romero Vega", image:null, link: "https://infravis.se/producing-and-rendering-a-3d-mesh-of-cassida-viridis-green-tortoise-beetle/"},
  //     {title:"Butterflies In Virtual Reality: Developing Workflows For Efficient Morphological Segmentation And Analysis Of X-Ray Microtomography Datasets", institute_id: 8, coordinator:"Anders Sjöström", image:null, link: "https://infravis.se/butterflies-in-virtual-reality-developing-workflows-for-efficient-morphological-segmentation-and-analysis-of-microct-scans-lu/"},
  //     {title:"Visualizing title", institute_id: 7, coordinator:"Mario", image:null, link: null},
  //     {title:"Vizualizing visuals", institute_id: 3, coordinator:"Mario", image:null, link: null},
  //     {title:"testing visuals", institute_id: 3, coordinator:"Mario", image:null, link: null},
  //     {title:"Title test", institute_id: 3, coordinator:"Mario", image:null, link: null},
  //     {title:"Title test", institute_id: 3, coordinator:"Mario", image:null, link: null},
  //     {title:"Title test", institute_id: 3, coordinator:"Mario", image:null, link: null},
  //     {title:"Title test", institute_id: 3, coordinator:"Mario", image:null, link: null},
  // ])
  const [enddate, setEnddate] = useState(null);
  const [minHours, setMinHours] = useState(0);
  const [level, setLevel] = useState(null);

  console.log(projects);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(`search: ${search}\nfilter: level: "${e.target.level.value}"\nstartdate: "${e.target.startdate.value}" enddate: "${e.target.enddate.value}"\nminhours: "${e.target.minhours.value}" maxhours: "${e.target.maxhours.value}"\numu:${e.target.umu.checked} mium:${e.target.mium.checked} uu:${e.target.uu.checked} kth:${e.target.kth.checked} liu:${e.target.liu.checked} chalmers:${e.target.chalmers.checked} ugot:${e.target.ugot.checked} lnu:${e.target.lnu.checked} lu:${e.target.lu.checked}`)

    const formData = {
      search: e.target.search.value,
      level: e.target.level.value,
      startdate: e.target.startdate.value,
      enddate: e.target.enddate.value,
      minhours: e.target.minhours.value,
      maxhours: e.target.maxhours.value,
      umu: e.target.umu.checked,
      mium: e.target.mium.checked,
      uu: e.target.uu.checked,
      kth: e.target.kth.checked,
      liu: e.target.liu.checked,
      chalmers: e.target.chalmers.checked,
      ugot: e.target.ugot.checked,
      lnu: e.target.lnu.checked,
      lu: e.target.lu.checked,
    };

    console.log(formData);

    const instituteMapping = {
      umu: 1,
      mium: 2,
      uu: 3,
      kth: 4,
      liu: 5,
      chalmers: 6,
      ugot: 7,
      lnu: 8,
      lu: 9,
    };

    const institutes = Object.entries(formData)
      .filter(([key, value]) => value === true && key in instituteMapping)
      .map(([key]) => instituteMapping[key]);

    const queryData = {
      q: formData.search,
      priority: formData.level,
      start_date: formData.startdate,
      end_date: formData.enddate,
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
      // const res = await fetch(`http://app:8080/filter?${queryString}`);

      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter = () => {
    setFilterOverflow("hidden");
    setShowFilter(!showFilter);
  };

  //style
  const filterMargin = showFilter ? 20 : 7.5;
  const filterPadding = showFilter ? 20 : 0;
  const filterHeight = showFilter ? "300px" : "0px";
  const filterColor = showFilter ? "#DE1690" : "grey";

  const [filterOverflow, setFilterOverflow] = useState("auto");

  const mapRef = useRef(null);
  return (
    <div className={styles.splitContainer}>
      <div className={styles.searchSide}>
        <form onSubmit={handleSubmit} style={{ width: "100%", height: "100%" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              gap: 10,
            }}
          >
            <input
              type="text"
              value={search}
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className={styles.searchBar}
            ></input>

            <label
              className={styles.searchButton}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                style={{ position: "absolute" }}
                height="25px"
                width="25px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#FFFFFF"
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                />
              </svg>
              <input
                type="submit"
                value={""}
                style={{
                  width: "100%",
                  height: "100%",
                  borderStyle: "none",
                  borderRadius: 20,
                  backgroundColor: "transparent",
                }}
              />
            </label>

            <div
              onClick={handleFilter}
              className={styles.searchButton}
              style={{ backgroundColor: filterColor }}
            >
              <svg
                height="25px"
                width="25px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill={"#ffffff"}
                  d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"
                />
              </svg>
            </div>
          </div>

          <div
            className={styles.filterContainer}
            style={{
              maxHeight: filterHeight,
              marginBottom: filterMargin,
              marginTop: filterMargin,
              paddingTop: filterPadding,
              paddingBottom: filterPadding,
              overflowY: filterOverflow,
            }}
            onTransitionEnd={() => setFilterOverflow("auto")}
          >
            <label>
              Start date
              <input
                type="date"
                max={enddate}
                id="startdate"
                name="startdate"
              />
            </label>
            <label>
              End date
              <input
                type="date"
                id="enddate"
                name="enddate"
                onChange={(e) => setEnddate(e.target.value)}
              />
            </label>
            <label>
              Level
              <input
                type="number"
                min="1"
                max="4"
                id="level"
                name="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
            </label>
            <label>
              Min hours
              <input
                type="number"
                className={styles.numberInput}
                min="0"
                id="minhours"
                name="minhours"
                value={minHours}
                onChange={(e) => setMinHours(e.target.value)}
              />
            </label>
            <label>
              Max hours
              <input
                type="number"
                className={styles.numberInput}
                min={minHours}
                id="maxhours"
                name="maxhours"
              />
            </label>
            <label>
              Umeå University (UmU)
              <input type="checkbox" id="umu" name="Umeå University (UmU)" />
            </label>
            <label>
              Mid Sweden University (MIUM)
              <input
                type="checkbox"
                id="mium"
                name="Mid Sweden University (MIUM)"
              />
            </label>
            <label>
              Uppsala University (UU)
              <input type="checkbox" id="uu" name="Uppsala University (UU)" />
            </label>
            <label>
              KTH Stockholm (KTH)
              <input type="checkbox" id="kth" name="KTH Stockholm (KTH)" />
            </label>
            <label>
              Linköping University (LiU)
              <input
                type="checkbox"
                id="liu"
                name="Linköping University (LiU)"
              />
            </label>
            <label>
              Chalmers
              <input type="checkbox" id="chalmers" name="Chalmers" />
            </label>
            <label>
              Gothenburg University (UGot)
              <input
                type="checkbox"
                id="ugot"
                name="Gothenburg University (UGot)"
              />
            </label>
            <label>
              Linnaeus University (LNU)
              <input
                type="checkbox"
                id="lnu"
                name="Linnaeus University (LNU)"
              />
            </label>
            <label>
              Lund University (LU)
              <input type="checkbox" id="lu" name="Lund University (LU)" />
            </label>
          </div>
        </form>

        <div className={styles.projectContainer}>
          {projects != null && projects.length > 0 &&
            projects.map((project) => (
              <Project
                title={project.Title}
                institute={project.Institute_id}
                coordinator={project.Users[0]}
                firstImage={project.image}
                link={project.URL}
                key={project.Title + project.nodes + project.coordinator}
              />
            ))}
        </div>

        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div
            onClick={() =>
              window.scrollTo({
                top: mapRef.current.offsetTop,
                behavior: "smooth",
              })
            }
            className={styles.scrollDownButton}
          >
            <svg
              height="30px"
              width="30px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="#FFFFFF"
                d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div ref={mapRef}>
        {/* <D3Example width="200" height="200" /> */}
        <Map projects={projects} />
      </div>
    </div>
  );
}
