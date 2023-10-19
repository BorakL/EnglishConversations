import ReactDOM from "react-dom"
import "./modal.scss"
import BackDrop from "./backDrop"
import Button from "../button/button"

const ModalOverlay = props => {
    const content = (
        <div className={`modal ${props.className}`}>
            {props.header ? <header>{props.header}</header> : null}
            <div className={`modalContent ${props.contentClass}`}>
                <div>{props.children}</div>
            </div>
            {props.footer ? <footer>{props.footer}</footer> : null}
            <Button
                onClick={props.closeHandler}
                type="icon"
                style="buttonIcon"
            >
                Close
            </Button>
        </div> 
    )         
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}

const Modal = props => {
    return(
        <>
            {props.show && <BackDrop onClick={props.closeHandler}/>}
            {props.show && <ModalOverlay {...props}/> } 
        </> 
    )
}

export default Modal;