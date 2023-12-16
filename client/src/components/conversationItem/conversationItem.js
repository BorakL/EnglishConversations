import {Link, useLocation} from 'react-router-dom'
import Button from '../button/button'
import {GrDocumentVerified} from "react-icons/gr"

const ConversationItem = ({conversation})=>{
    return(
        <div className="conversationItem">
            <Link to={conversation._id} >
                <div className='infoSection'>
                    <span className="terms">{conversation.conversation?.length || 0} Terms</span>
                    <span className="users"></span>
                </div>
                <div className='titleSection'>
                    <span>{conversation.title}</span>
                    <Button
                        type="link"
                        to={`${conversation._id}/test`}
                        icon
                    >
                        <GrDocumentVerified/>
                    </Button> 
                </div> 
            </Link>
        </div>
    )
}

export default ConversationItem