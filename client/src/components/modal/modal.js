// import BackDrop from "../uiElements/backDrop"
import ReactDOM from 'react-dom';

const ModalOverlay = props => {
    const content = (
        <div className={`modal ${props.className}`}>
            {props.header ? <header>{props.header}</header> : null}
            <div className={`modalContent ${props.contentClass}`}>
                {props.children}
            </div>
            {props.footer ? <footer>{props.footer}</footer> : null}
        </div>
    )
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}

const BackDrop = (props)=>{
    return(
        <div className={`backdrop ${props.backDropClass}`} onClick={props.closeHandler}>
            {props.children}
        </div>
    )
}

const Modal = (props)=>{
    return(
        <>
            <BackDrop {...props}>  
                <ModalOverlay {...props}/>
            </BackDrop>
        </>
    )
}

export default Modal;