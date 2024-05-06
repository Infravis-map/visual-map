

export default function Project(props) {
    return (
        <div style={{width:"100%", padding:0,}}>
            <div style={{padding:10, backgroundColor:"white", borderTopLeftRadius:10, borderTopRightRadius:10}}>
                <h2 style={{margin:0}}>title</h2>
                <h6 style={{margin:0, marginTop:5}}>Infravis Node:</h6>
                <p style={{margin:0}}>KTH</p>
                <h6 style={{margin:0, marginTop:5}}>Infravis Node Coordinator:</h6>
                <p style={{margin:0}}>Mario</p>
            </div>
            <div style={{ height: props.height, backgroundColor:"lightgray", borderBottomLeftRadius:10, borderBottomRightRadius:10}}></div>
        </div>
    )
}