import React from "react"
import ReactDOM from "react-dom"
import "./backDrop.scss"

const BackDrop = (props)=>{
    return ReactDOM.createPortal(
        <div className="backDrop" onClick={props.onClick}>
            {props.children}
        </div>,
        document.getElementById('backdrop-hook')
    )
}

export default BackDrop