import D3Example from '../components/D3Example'
//import Chart from '../components/Chart'
import Project from '../components/Project'
import { useState, useRef } from "react"
import styles from '../styles/test.module.css'

export default function TestPage() {
    const [search, setSearch] = useState("")
    const [showFilter, setShowFilter] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`search: ${search}\nfilter: ${event.target.filter1.checked}, ${event.target.filter2.checked}, ${event.target.filter3.checked}, ${event.target.filter4.checked}`)
    }

    const handleFilter = () => {
        setShowFilter(!showFilter)
    }

    //style
    const filterMargin = showFilter ? 20 : 7.5
    const filterPadding = showFilter ? 20 : 0
    const filterHeight = showFilter ? "100px" : "0px"
    const filterColor = showFilter ? "#DE1690" : ""

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
                    
                    <div className={styles.filterContainer} style={{height:filterHeight, marginBottom:filterMargin, marginTop:filterMargin, paddingTop:filterPadding, paddingBottom:filterPadding}}>
                        <label for="filter1">filter 1:</label>
                        <input type="checkbox" id="filter1" name="filter1" style={{marginRight:10}}/>
                        <label for="filter2">filter 2:</label>
                        <input type="checkbox" id="filter2" name="filter2" style={{marginRight:10}}/>
                        <label for="filter3">filter 3:</label>
                        <input type="checkbox" id="filter3" name="filter3" style={{marginRight:10}}/>
                        <label for="filter4">filter 4:</label>
                        <input type="checkbox" id="filter4" name="filter4"/>
                    </div>
                </form>




                <div className={styles.projectContainer}>
                    <Project/>
                    <Project/>
                    <Project/>
                    <Project/>
                    <Project/>
                    <Project/>
                    <Project/>
                    <Project/>
                    <Project/>
                    <Project/>
                </div>
                <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
                    <div onClick={() => window.scrollTo({top:mapRef.current.offsetTop, behavior:"smooth"})} className={styles.scrollDownButton}>
                        <svg height="30px" width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#FFFFFF" d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
                    </div>
                </div>
            </div>


            <div ref={mapRef}>
                <D3Example width="200" height="200" />
            </div>
        </div>
    )
}