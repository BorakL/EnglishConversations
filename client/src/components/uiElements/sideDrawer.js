import React from "react"
import {CSSTransition} from "react-transition-group"
import ReactDOM from "react-dom"
import "./sideDrawer.scss"

const SideDrawer = (props)=>{
    const content = (
        <CSSTransition
            in={props.show}
            timeout={200}
            classNames="slide-in-left"
            mounOnEnter
            unmountOnExit
        >
            <aside className="sideDrawer" onClick={props.onClick}>
                {props.children}
            </aside>
        </CSSTransition>
    )

    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'))
}

export default SideDrawer