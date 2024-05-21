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
    const [institute, setInstitute] = useState(null)
    const [hours, setHours] = useState("")
    const [priority, setPriority] = useState("")
    const [link, setLink] = useState("")
    const [keywords, setKeywords] = useState("")
    const [image, setImage] = useState(null)

    const imageDisplay = image ? "block" : "none"

    //dont change order, look at "instituteOptionsHandler" for reference
    const instituteOptions = [
        "Umeå University (UmU)", 
        "Mid Sweden University (MIUM)",
        "Uppsala University (UU)",
        "KTH Stockholm (KTH)",
        "Linköping University (LiU)",
        "Chalmers",
        "Gothenburg University (UGot)",
        "Linnaeus University (LNU)",
        "Lund University (LU)",
    ];

    const instituteOptionsHandler = (e) => {
        const inst = instituteOptions.indexOf(e.target.value)
        if (inst == -1) {
            setInstitute(null)
        } else {
            setInstitute(inst)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`handleSubmit() title: ${title}, total hours: ${hours}`)
    }

    const changeImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            if (e.target.files[0].size > 1e+7) {
                alert("image to big")
            } else {
                const reader = new FileReader()
                reader.readAsDataURL(e.target.files[0])
                reader.onload = () => {
                    const readFile = (reader.result).toString()
                    setImage(readFile)
                }
            }
        }
    }

    return (
        <div style={{display:"flex", justifyContent:"center"}}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                    Title
                    <input required type="text" value={title} name="title" onChange={(e) => setTitle(e.target.value)} placeholder="Title"></input>
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
                <label>
                    Institute
                    <p>The main institute of the project</p>    
                    <select onChange={instituteOptionsHandler} style={{padding:3, fontSize:14}}>
                        <option key="hej">Please choose an institute</option>
                        {instituteOptions.map((option, index) => {
                            return (
                                <option key={index}>
                                    {option}
                                </option>
                            );
                        })}
                    </select>    
                </label>
                <label>
                    Number of hours spent on project
                    <p>input a number</p>
                    <input type="number" value={hours} name="hours" onChange={(e) => setHours(e.target.value)}></input>
                </label>
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
                    <p>input a number 1 to 3</p>
                    <input type="number" min="1" max="3" value={priority} name="priority" onChange={(e) => setPriority(e.target.value)}></input>
                </label>
                <label>
                    Link to project on InfraVis website
                    <p>example: <a target="_blank" rel="noopener noreferrer" href="https://infravis.se/visualizing-buzz-pollination/">https://infravis.se/visualizing-buzz-pollination/</a></p>
                    <input type="url" value={link} name="link" onChange={(e) => setLink(e.target.value)}></input>
                </label>
                <label>
                    Keywords
                    <p>seperate by commas</p>
                    <input type="text" value={keywords} name="keywords" onChange={(e) => setKeywords(e.target.value)} placeholder="Data, Visualization"></input>
                </label>
                <label>
                    Image
                    <p>the image is shown below basic info</p>
                    <input type="file" accept="image/*"  name="image" onChange={(e) => changeImage(e)}></input>
                    <img src={image} className={styles.inputImage} style={{display:imageDisplay}}></img>
                </label>
            </form>
        </div>
    )
}