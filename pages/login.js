import { useState } from "react";

export default function logInPage() {
    const [password, setPassword] = useState("");
    const [failed, setFailed] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const handleLogIn = () => {
        if (password === "hej") {
            setLoggedIn(true)
        } else {
            console.log(`log in ${password}`)
            setFailed(true)
        }
        setPassword("")
    }
    const handleLogOut = () => {
        console.log("log out")
        setFailed(false)
        console.log(failed)
        setLoggedIn(false)
    }
    return (
        loggedIn ? (
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", flexDirection:"column", gap:20}}>
                You are logged in!
                <button onClick={handleLogOut}>log out</button>
            </div>
        ) : (
            <div style={{display:"flex", justifyContent:"center", height:"100vh", flexDirection:"column"}}>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <label style={{display:"flex", gap:10}}>
                        Password:
                        <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} style={{borderColor:`${failed ? "red" : "grey"}`}}></input>
                        
                    </label>
                </div>
                <div style={{display:`${failed ? "flex" : "none"}`, justifyContent:"center", color:"red"}}>wrong password</div>
                <div style={{display:"flex", justifyContent:"center", marginTop:20, gap:10}}>
                    <button onClick={handleLogIn}>log in</button>
                </div>
            </div>
        )
    )
}