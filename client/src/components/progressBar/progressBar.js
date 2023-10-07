const ProgressBar = (props)=>{

    const progressBarContainerStyle={
        "box-sizing":"border-box",
        "width":`${props.width || 100}%`,
        "height":"20px",
        "border":"1px solid grey",
        "padding":"2px"
    }

    const progressBarInnerStyle = {
        "width":`${props.progress}%`,
        "height":"100%",
        "backgroundColor":`${props.color || "red"}`
    }

    const progressBarTitleStyle = {
        "display":"flex",
        "flexDirection":"row",
        "justify-content":"space-between"
    }

    return(
        <div className="progressBar">
            <div style={progressBarContainerStyle}>
                <div style={progressBarInnerStyle}></div>
            </div>
            <div style={progressBarTitleStyle}>
                <div>{props.title}</div>
                <div>{props.count || "0"}</div>
            </div>
        </div>
    )
}


export default ProgressBar