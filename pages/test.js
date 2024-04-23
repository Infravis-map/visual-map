import D3Example from '../components/D3Example'
import Project from '../components/Project'

export default function TestPage() {
    return (
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr" }}>
            <div style={{ display:"grid", gridTemplateRows:"auto 1fr", height:"100vh", padding:20, paddingRight:0}}>
                <div style={{width:"100%", marginBottom:20, gap: 10, display:"grid", gridTemplateColumns: "1fr auto auto"}}> 
                    <input placeholder="Search..." type="search" style={{width:"100%", height:40, borderRadius:20, borderStyle:"solid", borderWidth:5, borderColor:"#DE1690", paddingLeft:10, paddingRight:10 }}></input>
                    <button style={{width:40,height:40, borderStyle:"none", borderRadius:20, backgroundColor:"gray",}}></button>
                    <button style={{width:40,height:40, borderStyle:"none", borderRadius:20, backgroundColor:"gray",}}></button>
                </div>
                <div style={{ overflowY:"auto", scrollbarWidth:"none", scrollBehavior: "smooth", height: "100%", borderRadius:20, backgroundColor:"gray", padding:15, gap:15, display: "grid", gridTemplateColumns:"1fr 1fr" }}>
                    <Project/>
                    <Project/>
                    <Project/>
                    <Project/>
                    <Project/>
                </div>
            </div>

            <D3Example width="200" height="200" />
        </div>
    )
}