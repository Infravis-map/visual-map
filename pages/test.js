import D3Example from '../components/D3Example'
import Project from '../components/Project'
import { useState, useRef } from "react"
import dynamic from 'next/dynamic'
import styles from '../styles/test.module.css'

const Map = dynamic(() => import('../components/Map.js'), { ssr: false });

export default function TestPage() {
    const [search, setSearch] = useState("")
    const [showFilter, setShowFilter] = useState(false)
    const [projects, setProjects] = useState([
        {title:"Interesting title", institute:"KTH Stockholm (KTH)", coordinator:"Mario", image:null},
        {title:"Test title", institute:"KTH Stockholm (KTH)", coordinator:"", image:null},
        {title:"How stuff is visualized in a long title", institute:null, coordinator:"Mario", image:null},
        {title:"Study in Visualization", institute:"KTH Stockholm (KTH)", coordinator:"Mario", image:null},
        {title:"Visualizing title", institute:"Linnaeus University (LNU)", coordinator:"Mario", image:null},
        {title:"Vizualizing visuals", institute:"KTH Stockholm (KTH)", coordinator:"Mario", image:null},
        {title:"testing visuals", institute:"KTH Stockholm (KTH)", coordinator:"Mario", image:null},
        {title:"Title test", institute:"KTH Stockholm (KTH)", coordinator:"Mario", image:null},
        {title:"Title test", institute:"KTH Stockholm (KTH)", coordinator:"Mario", image:null},
        {title:"Title test", institute:"KTH Stockholm (KTH)", coordinator:"Mario", image:null},
        {title:"Title test", institute:"KTH Stockholm (KTH)", coordinator:"Mario", image:null},
    ])
    const [enddate, setEnddate] = useState(null)
    const [minHours, setMinHours] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`search: ${search}\nfilter: priority: "${e.target.priority.value}"\nstartdate: "${e.target.startdate.value}" enddate: "${e.target.enddate.value}"\nminhours: "${e.target.minhours.value}" maxhours: "${e.target.maxhours.value}"\numu:${e.target.umu.checked} mium:${e.target.mium.checked} uu:${e.target.uu.checked} kth:${e.target.kth.checked} liu:${e.target.liu.checked} chalmers:${e.target.chalmers.checked} ugot:${e.target.ugot.checked} lnu:${e.target.lnu.checked} lu:${e.target.lu.checked}`)
    }

    const handleFilter = () => {
        setFilterOverflow("hidden")
        setShowFilter(!showFilter)
    }

    //style
    const filterMargin = showFilter ? 20 : 7.5
    const filterPadding = showFilter ? 20 : 0
    const filterHeight = showFilter ? "350px" : "0px"
    const filterColor = showFilter ? "#DE1690" : "grey"

    const [filterOverflow, setFilterOverflow] = useState("auto")

    const mapRef = useRef(null);
    return (
        <div className={styles.splitContainer}>
            <div className={styles.searchSide}>
                
                
                <form onSubmit={handleSubmit} style={{width:"100%", height:"100%"}}>
                    <div style={{display:"grid", gridTemplateColumns: "1fr auto auto", gap: 10}}>
                        <input type="text" value={search} name="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className={styles.searchBar}></input>
                    
                        <label className={styles.searchButton} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <svg style={{position:'absolute'}} height="25px" width="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#FFFFFF" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                            <input type="submit" value={""} style={{width:"100%",height:"100%", borderStyle:"none", borderRadius:20, backgroundColor:"transparent"}}/>
                        </label>

                        <div onClick={handleFilter} className={styles.searchButton} style={{backgroundColor:filterColor}}>
                            <svg height="25px" width="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill={"#ffffff"} d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"/></svg>
                        </div>
                    </div>
                    
                    <div className={styles.filterContainer} style={{maxHeight:filterHeight, marginBottom:filterMargin, marginTop:filterMargin, paddingTop:filterPadding, paddingBottom:filterPadding, overflowY:filterOverflow}} onTransitionEnd={() => setFilterOverflow("auto")}>
                        <label>start date
                            <input type="date" max={enddate} id="startdate" name="startdate"/>
                        </label>
                        <label>end date
                            <input type="date" id="enddate" name="enddate" onChange={(e) => setEnddate(e.target.value)}/>
                        </label>
                        <label>Priority
                            <input type="number" className={styles.numberInput} min="1" max="3" id="priority" name="priority"/>
                        </label>
                        <label>min hours
                            <input type="number" className={styles.numberInput} min="0" id="minhours" name="minhours" value={minHours} onChange={(e) => setMinHours(e.target.value)} />
                        </label>
                        <label>max hours
                            <input type="number" className={styles.numberInput} min={minHours} id="maxhours" name="maxhours"/>
                        </label>
                        <label>Umeå University (UmU)
                            <input type="checkbox" id="umu" name="Umeå University (UmU)"/>
                        </label>
                        <label>Mid Sweden University (MIUM)
                            <input type="checkbox" id="mium" name="Mid Sweden University (MIUM)"/>
                        </label>
                        <label>Uppsala University (UU)
                            <input type="checkbox" id="uu" name="Uppsala University (UU)"/>
                        </label>
                        <label>KTH Stockholm (KTH)
                            <input type="checkbox" id="kth" name="KTH Stockholm (KTH)"/>
                        </label>
                        <label>Linköping University (LiU)
                            <input type="checkbox" id="liu" name="Linköping University (LiU)"/>
                        </label>
                        <label>Chalmers
                            <input type="checkbox" id="chalmers" name="Chalmers"/>
                        </label>
                        <label>Gothenburg University (UGot)
                            <input type="checkbox" id="ugot" name="Gothenburg University (UGot)"/>
                        </label>
                        <label>Linnaeus University (LNU)
                            <input type="checkbox" id="lnu" name="Linnaeus University (LNU)"/>
                        </label>
                        <label>Lund University (LU)
                            <input type="checkbox" id="lu" name="Lund University (LU)"/>
                        </label>
                    </div>
                </form>




                <div className={styles.projectContainer}>
                    {projects.map(project => (
                        <Project 
                            title={project.title}
                            institute={project.institute}
                            coordinator={project.coordinator}
                            firstImage={project.image}
                            key={project.title + project.nodes + project.coordinator}
                        />
                    ))}
                </div>
 
                <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
                    <div onClick={() => window.scrollTo({top:mapRef.current.offsetTop, behavior:"smooth"})} className={styles.scrollDownButton}>
                        <svg height="30px" width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#FFFFFF" d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
                    </div>
                </div>
            </div>


            <div ref={mapRef}>
                {/* <D3Example width="200" height="200" /> */}
                <Map/>
            </div>
        </div>
    )
}