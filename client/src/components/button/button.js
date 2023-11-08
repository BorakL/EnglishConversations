import {Link, NavLink} from 'react-router-dom'

const Button = props => {

    const getClasses = () => {
        let classes = ""
        let size = props.size ? props.size : ""
        if(!props.style){
            switch(props){
                case props.size : classes=''
                case props.danger : classes='danger'
                case props.correct : classes='correct'
                case props.wrong : classes='wrong'
                case props.inverse : classes='inverse'
                case props.disabled : classes='disabled'
                default : classes=''
            }
        }else{
            return props.style
        }
        return ["button",classes,size].join(" ")
    }

    const navLinkStyles = ({isActive,isPending,isTransitioning}) => [
        isPending ? "pending" : "",
        isActive ? "active" : "",
        isTransitioning ? "transitioning" : "",
        getClasses()
    ].join(" ")

    if(props.href){
        return (
            <a
                className={getClasses()}                
                href={props.href}
            >
                {props.children}
            </a>
        )
    }
    if(props.to){
        if(props.element==="navLink"){
            return(<NavLink 
                to={props.to}
                exact={props.exact} 
                onClick={props.onClick}
                className={navLinkStyles}
            >
            {props.children}
            </NavLink>)
        }else{
            return(<Link 
                to={props.to}
                exact={props.exact}
                className={getClasses()}
                onClick={props.onClick}
            >
            {props.children}
            </Link>)   
        }
    }

    return(
        <button 
            className={`${getClasses()} ${props.active ? 'active' : ''}`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
            ref={props.refNext}
        >
            {props.children}
        </button>
    )
}

export default Button;