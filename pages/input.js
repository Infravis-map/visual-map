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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`handleSubmit() title: ${title}`)
    }

    const addInstitution = () => {
        if (institutionName.length > 0 && institutionHours > 0) {
            
            const newInstitutions = institutions.concat({
                number:institutionNumber++, 
                name:institutionName, 
                hours:institutionHours,
            })
            setInstitutions(newInstitutions)
            setInstitutionName("")
            setInstitutionHours("")
        }
    }

    const removeInstitution = (number) => {
        const newInstitutions = institutions.filter((institution) => institution.number !== number)
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
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <div>
                                <p>location:</p>
                                <input type="text" value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} placeholder=""></input>
                            </div>
                            <div>
                                <p>hours:</p>
                                <input type="number" value={institutionHours} onChange={(e) => setInstitutionHours(e.target.value)} placeholder=""></input>
                            </div>
                            <div style={{display:"flex", flexDirection:"column-reverse"}}>
                                <button style={{cursor:"pointer"}} onClick={addInstitution}>Add</button>
                            </div>
                        </div>
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
            </form>
        </div>
    )
}