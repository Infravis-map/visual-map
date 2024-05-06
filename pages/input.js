import { useState } from "react"
import styles from '../styles/input.module.css'

export default function InputPage() {
    
    const [title, setTitle] = useState("")
    const [about, setAbout] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`title: ${title}`)
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
            </form>
        </div>
    )
}