import { useState } from "react"
import styles from '../styles/input.module.css'

let institutionNumber = 1

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
        console.log(`title: ${title}`)
    }

    const addInstitution = () => {
        setInstitutions([
            ...institutions,
            {
                number:institutionNumber++, 
                name:institutionName, 
                hours:institutionHours,
            }
        ])
        console.log("add")
        console.log(institutions)
        // setInstitutionName("")
        // setInstitutionHours("")
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
                        InfraVis Users
                        <ul>
                            {institutions.map(institution => (
                                <li key={institution.number}>
                                    {institution.name}{' '}{institution.hours}
                                    <button onClick={() => {
                                    console.log(institutions),
                                    setInstitutions(
                                        institutions.filter((inst) =>
                                            inst.number !== institution.number,
                                        )
                                    );
                                    }}>
                                    Delete
                                    </button>
                                </li>
                            ))}
                        </ul> 
                        <input type="text" value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} placeholder="KTH"></input>
                        <input type="number" value={institutionHours} onChange={(e) => setInstitutionHours(e.target.value)} placeholder="40"></input>
                        <button onClick={addInstitution}>Add</button>
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