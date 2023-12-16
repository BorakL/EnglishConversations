import ReactDOM from "react-dom"
import "./modal.scss"
import BackDrop from "./backDrop"
import Button from "../button/button"
import {AiOutlineClose} from 'react-icons/ai'

const ModalOverlay = props => {
    const content = (
        <div className={`${props.fullScreen ? "fullScreenModal" : "modal"} ${props.className || ''}`}>
            {props.header ? <header>{props.header}</header> : null}
            <div className={`modalContent ${props.contentClass || ''}`}>
                <div>{props.children}</div>
            </div>
            {props.footer ? <footer>{props.footer}</footer> : null}
            <Button
                onClick={props.closeHandler}
                icon
            >
                <AiOutlineClose/>
            </Button>
        </div> 
    )         
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}

const Modal = props => {
    return(
        <>
            {props.show && !props.fullScreen ? <BackDrop onClick={props.closeHandler}/> : null}
            {props.show && <ModalOverlay {...props}/> } 
        </> 
    )
}

export default Modal;