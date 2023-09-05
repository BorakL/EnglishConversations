import React from "react"
import { ReactDOM } from "react"

const BackDrop = ()=>{
    return ReactDOM.createPortal(
        <div className="backDrop" onClick={props.onClick}></div>,
        document.getElementById('backdrop-hook')
    )
}

export default BackDrop