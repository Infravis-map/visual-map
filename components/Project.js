import { useState } from "react"


export default function Project({title, institute, coordinator, firstImage, link}) {
    const [image, setImage] = useState(firstImage)
    const containerBorderRadius = image ? 0 : 10
    const [showEdit, setShowEdit] = useState(true)
    const instituteOptions = [
        "Umeå University (UmU)",        // 0
        "Mid Sweden University (MIUM)", // 1
        "Uppsala University (UU)",      // 2
        "KTH Stockholm (KTH)",          // 3
        "Linköping University (LiU)",   // 4
        "Chalmers",                     // 5
        "Gothenburg University (UGot)", // 6
        "Linnaeus University (LNU)",    // 7
        "Lund University (LU)",         // 8
    ];

    const changeImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            //setImage(e.target.files[0])
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                console.log('called: ', reader.result)
                const readFile = (reader.result).toString()
                console.log(readFile.length)
                setImage(readFile)
            }
            //console.log(e.target.files[0])
        }
    }

    return (
        <a style={{display: "table-cell"}} href={link} target="_blank" onClick={() => setShowEdit(false)}>
            <div style={{padding:10, backgroundColor:"white", borderTopLeftRadius:10, borderTopRightRadius:10, borderBottomLeftRadius:containerBorderRadius, borderBottomRightRadius:containerBorderRadius}}>
                <h2 style={{margin:0, marginBottom:7}}>{title}</h2>

                {(institute != null && institute >= 0 && institute < instituteOptions.length) ? 
                    <div>
                        <h6 style={{margin:0, marginTop:5, color:"grey"}}>Institute:</h6>
                        <p style={{margin:0}}>{instituteOptions[institute]}</p>
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
                <img src={image} style={{ width:"100%", maxHeight:"150px", objectFit:"cover", borderBottomLeftRadius:10, borderBottomRightRadius:10}}></img>
            : null}
        </a>
    )
}