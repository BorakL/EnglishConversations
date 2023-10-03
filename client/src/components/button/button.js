import {Link} from 'react-router-dom'

const Button = props => {

    const classes = `${props.style || 'button'} 
                     ${!props.style && props.size || ''}
                     ${!props.style && props.danger && 'danger' || ''}
                     ${!props.style && props.inverse && 'inverse' || ''}
                     ${!props.style && props.disabled && 'disabled' || ''}`

    if(props.href){
        return (
            <a
                className={classes}                
                href={props.href}
            >
                {props.children}
            </a>
        )
    }
    if(props.to){
        return(<Link 
                to={props.to}
                exact={props.exact}
                className={classes}
            >
            {props.children}
            </Link>
        )
    }
    return(
        <button 
            className={`${classes} ${props.active && 'active'}`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button;