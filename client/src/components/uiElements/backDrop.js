import React from "react"
import ReactDOM from "react-dom"

const BackDrop = (props)=>{
    return ReactDOM.createPortal(
        <div className="backDrop" onClick={props.onClick}></div>,
        document.getElementById('backdrop-hook')
    )
}

export default BackDrop