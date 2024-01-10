import {Link, useLocation} from "react-router-dom"
import "./topicItem.scss"

const TopicItem = ({topic})=>{
const location = useLocation();

const topicImg = `/https://tiny-tan-cygnet-gear.cyclic.app/img/topics/${topic.title}.jpg`;

    return(
        <Link to={topic._id} state={{backgroundLocation:location}}>
            <div className="topicItem">
                <div className="topicImg">
                    <img src={topicImg} alt={topic.title}/>
                </div>
                <div className="topicTitle">
                    {topic.title} ({topic.conversationCount})
                </div>
            </div>
        </Link>
        
    )
}

export default TopicItem;