import {Link} from 'react-router-dom'

const ConversationItem = ({conversation})=>{
    return(
        <div className="conversationItem">
            <Link to={conversation._id}>
                <div>{conversation.title}</div>
            </Link>        
            <div>
                <button>
                    <Link to={`${conversation._id}/test`}>Test</Link>
                </button>
            </div>
        </div>
    )
}

export default ConversationItem