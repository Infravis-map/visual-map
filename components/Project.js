import { useState } from "react"


export default function Project({title, nodes, coordinator, firstImage}) {
    const [image, setImage] = useState(firstImage)
    const containerBorderRadius = image ? 0 : 10
    const [showEdit, setShowEdit] = useState(false)

    const changeImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    return (
        <div style={{width:"100%", padding:0}} onClick={() => setShowEdit(!showEdit)}>
            <div style={{padding:10, backgroundColor:"white", borderTopLeftRadius:10, borderTopRightRadius:10, borderBottomLeftRadius:containerBorderRadius, borderBottomRightRadius:containerBorderRadius}}>
                <h2 style={{margin:0, marginBottom:7}}>{title}</h2>

                {nodes.length >= 1 ? 
                    <div>
                        <h6 style={{margin:0, marginTop:5, color:"grey"}}>Infravis Node:</h6>
                        <p style={{margin:0}}>{nodes.join(", ")}</p>
                    </div>
                : null}

                {coordinator ? 
                    <div>
                        <h6 style={{margin:0, marginTop:5, color:"grey"}}>Infravis Node Coordinator:</h6>
                        <p style={{margin:0}}>{coordinator}</p>
                    </div>
                : null}

                 
                <input type="file" accept="image/*"  name="image" style={{display:`${showEdit ? "block" : "none"}`}} onChange={(e) => changeImage(e)}></input>
                
                
            </div>
            {image ? 
                <img src={URL.createObjectURL(image)} style={{ width:"100%", maxHeight:"150px", objectFit:"cover", borderBottomLeftRadius:10, borderBottomRightRadius:10}}></img>
            : null}
            
        </div>
    )
}