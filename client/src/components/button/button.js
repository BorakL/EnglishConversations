import {Link, NavLink} from 'react-router-dom'

const Button = props => {

    const getClasses = () => {
        let buttonClasses = ["md","sm","xl","lg","fullWidth","active","danger","correct","wrong","inverse","disabled","text"]
        let classes = []
        buttonClasses.forEach(c => {
            if(props[c]) classes.push(c)
        })
        return [props.icon ? "icon" : "button", ...classes].join(" ")
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
        if(props.navLink){
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
            className={getClasses()}
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