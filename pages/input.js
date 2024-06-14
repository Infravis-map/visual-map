import { useState } from "react"
import styles from '../styles/input.module.css'
import fetch from "isomorphic-unfetch";


let institutionNumber = 0

export default function InputPage() {
    
    const [title, setTitle] = useState("")
    const [about, setAbout] = useState("")
    const [startdate, setStartdate] = useState()
    const [enddate, setEnddate] = useState()
    const [coordinator, setCoordinator] = useState("")
    const [applicationExperts, setApplicationExperts] = useState("")
    const [users, setUsers] = useState("")
    const [institute, setInstitute] = useState(null)
    const [hours, setHours] = useState("")
    const [level, setLevel] = useState("")
    const [link, setLink] = useState("")
    const [keywords, setKeywords] = useState("")
    const [image, setImage] = useState(null)
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

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
        const inst = parseInt(e.target.value) + 1;
        console.log(inst);
        if (inst == -1) {
            setInstitute(null);
        } else {
            setInstitute(inst);
        }
    }

    const insertProject = async (project) => {
        const response = await fetch("http://localhost:8080/insert", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        });
    
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Something went wrong");
        }
    
        return response.json();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(`handleSubmit() title: ${title}, total hours: ${hours}`);

        setError("");
        setSuccess("");

        // testing with hardcoded pw
        console.log(password);
        if (password !== "admin") {
            setError("Incorrect password");
            return;
        }

        // console.log(institute);

        const project = {
            title,
            institute: institute,
            abstract: about,
            start_date: startdate,
            end_date: enddate,
            coordinator,
            // application_experts: ,
            user_names: users.split(",").map((name) => name.trim()).concat(applicationExperts.split(",").map((name) => name.trim())),
            hours: parseInt(hours),
            priority: parseInt(level),
            header_url: link,
            keywords,
            img: image,
        };

        try {
            await insertProject(project);
            setSuccess("Project inserted successfully!");
            // Optionally reset form fields
        } catch (err) {
            setError(err.message);
        }
    };

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
        <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
            <h1 style={{marginTop:60}}>Add project to database</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                    Title
                    <input required type="text" value={title} name="title" onChange={(e) => setTitle(e.target.value)} placeholder="Title"></input>
                </label>
                <label>
                    About
                    <p>roughly 150 words</p>
                    <textarea type="text" value={about} name="about" onChange={(e) => setAbout(e.target.value)} placeholder="About" style={{height:"5rem", resize:"vertical"}}></textarea>
                </label>
                <label>
                    InfraVis Node Coordinator  
                    <input type="text" value={coordinator} name="coordinator" onChange={(e) => setCoordinator(e.target.value)} placeholder="John Smith"></input>
                </label>
                <label>
                    InfraVis Application Experts
                    <p>seperate names by a comma</p>    
                    <input type="text" value={applicationExperts} name="applicationExperts" onChange={(e) => setApplicationExperts(e.target.value)} placeholder="John Smith, John Smith"></input>
                </label>
                <label>
                    InfraVis Users
                    <p>seperate names by a comma</p>    
                    <input type="text" value={users} name="users" onChange={(e) => setUsers(e.target.value)} placeholder="John Smith, John Smith"></input>
                </label>
                <label>
                    Institute
                    <p>The main institute of the project</p>    
                    <select onChange={instituteOptionsHandler} style={{padding:3, fontSize:14}} required>
                        <option key="choose institute" value="">Please choose an institute</option>
                        {instituteOptions.map((option, index) => {
                            return (
                                <option key={index} value={index}>
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
                    Level of project
                    <p>input a number 1 to 4</p>
                    <input type="number" min="1" max="4" value={level} name="level" onChange={(e) => setLevel(e.target.value)}></input>
                </label>
                <label>
                    Link to project on InfraVis website
                    <p>example: <a target="_blank" rel="noopener noreferrer" href="https://infravis.se/visualizing-buzz-pollination/">https://infravis.se/visualizing-buzz-pollination/</a></p>
                    <input type="url" value={link} name="link" onChange={(e) => setLink(e.target.value)} requ></input>
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
                <label style={{marginTop:30, borderStyle:"solid", borderColor:"red", borderWidth:1, padding:20, paddingTop:15, borderRadius:5}}>
                    Password
                    <p>needed to add the project to the database</p>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:10}}>
                    Submit
                    <input type="submit" style={{width:100, height:40, marginTop:5, backgroundColor:"lightblue", borderRadius:10}}></input>
                </label>
            </form>
        </div>
    )
}