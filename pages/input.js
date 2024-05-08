import { useState } from "react"
import styles from '../styles/input.module.css'

let institutionNumber = 0

export default function InputPage() {
    
    const [title, setTitle] = useState("")
    const [about, setAbout] = useState("")
    const [startdate, setStartdate] = useState()
    const [enddate, setEnddate] = useState()
    const [coordinator, setCoordinator] = useState("")
    const [users, setUsers] = useState("")
    const [institutions, setInstitutions] = useState([])
    const [institutionName, setInstitutionName] = useState("")
    const [institutionHours, setInstitutionHours] = useState("")
    const [totalHours, setTotalHours] = useState(0)
    const [priority, setPriority] = useState("")
    const [link, setLink] = useState("")
    const [keywords, setKeywords] = useState("")
    const [image, setImage] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`handleSubmit() title: ${title}, total hours: ${totalHours}`)
    }

    const addInstitution = () => {
        if (institutionName.length > 0 && institutionHours > 0) {
            
            const newInstitutions = institutions.concat({
                number:institutionNumber++, 
                name:institutionName, 
                hours:parseInt(institutionHours),
            })
            setTotalHours(totalHours + parseInt(institutionHours))
            setInstitutions(newInstitutions)
            setInstitutionName("")
            setInstitutionHours("")
        }
    }

    const removeInstitution = (number) => {
        const newInstitutions = institutions.filter((institution) => institution.number !== number)
        setTotalHours(newInstitutions.reduce((total, current) => total += current.hours, 0))
        setInstitutions(newInstitutions)
    }

    return (
        <div style={{display:"flex", justifyContent:"center"}}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                    Title
                    <input type="text" value={title} name="title" onChange={(e) => setTitle(e.target.value)} placeholder="Title"></input>
                </label>
                <label>
                    About
                    <p>roughly 150 words</p>
                    <input type="text" value={about} name="about" onChange={(e) => setAbout(e.target.value)} placeholder="About"></input>
                </label>
                <label>
                    InfraVis Node Coordinator  
                    <input type="text" value={coordinator} name="coordinator" onChange={(e) => setCoordinator(e.target.value)} placeholder="John Smith"></input>
                </label>
                <label>
                    InfraVis Users
                    <p>seperate names by a comma</p>    
                    <input type="text" value={users} name="users" onChange={(e) => setUsers(e.target.value)} placeholder="John Smith, John Smith"></input>
                </label>
                <div>
                    <label>
                        InfraVis Locations
                        <div className={styles.list}>
                            {institutions.map(institution => (
                                <div className={styles.listElement} key={institution.number}>
                                    {institution.name}{' - '}{institution.hours}{' hours'}
                                    <div onClick={() => {removeInstitution(institution.number)}}>
                                    Delete
                                    </div>
                                </div>
                            ))}
                        </div> 
                        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr auto"}}>
                            <div>
                                <p>location:</p>
                                <input style={{width:"100%"}} type="text" value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} placeholder=""></input>
                            </div>
                            <div>
                                <p>hours:</p>
                                <input style={{width:"100%"}} type="number" value={institutionHours} onChange={(e) => setInstitutionHours(e.target.value)} placeholder=""></input>
                            </div>
                            <div style={{display:"flex", flexDirection:"column-reverse", marginLeft:20}}>
                                <button style={{cursor:"pointer", backgroundColor:"lightgray"}} onClick={addInstitution}>Add</button>
                            </div>
                        </div>
                        <p>total hours: {totalHours}</p>
                    </label>
                </div>
                <div className={styles.dates}>
                    <label>
                        Startdate
                        <input type="date" value={startdate} name="startdate" onChange={(e) => setStartdate(e.target.value)}></input>
                    </label>
                    <label>
                        Enddate
                        <input type="date" value={enddate} name="enddate" onChange={(e) => setEnddate(e.target.value)}></input>
                    </label>
                </div>
                <label>
                    Priority of project
                    <input type="number" min="1" max="3" value={priority} name="priority" onChange={(e) => setPriority(e.target.value)}></input>
                </label>
                <label>
                    Link to project on InfraVis website
                    <p>example: <a target="_blank" rel="noopener noreferrer" href="https://infravis.se/visualizing-buzz-pollination/">https://infravis.se/visualizing-buzz-pollination/</a></p>
                    <input type="url" value={link} name="link" onChange={(e) => setLink(e.target.value)}></input>
                </label>
                <label>
                    Keywords
                    <input type="text" value={keywords} name="keywords" onChange={(e) => setKeywords(e.target.value)}></input>
                </label>
                <label>
                    Image
                    <p>Is shown below basic info</p>
                    <input type="file" accept="image/*" value={image} name="image" onChange={(e) => setImage(e.target.files[0])}></input>
                </label>
            </form>
        </div>
    )
}