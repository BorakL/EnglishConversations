import {Link, useLocation} from "react-router-dom"
import "./topicItem.scss"
import { useState } from "react";

const TopicItem = ({topic})=>{
const location = useLocation();

const[topicUrl,setTopicUrl] = useState(`${process.env.REACT_APP_API_BASE_URL}/img/topics/${topic.title}.jpg`)

// const topicUrl = `${process.env.REACT_APP_API_BASE_URL}/img/topics/${topic.title}.jpg`;
const defaultTopicUrl = `${process.env.REACT_APP_BASE_URL}/default-image.jpg`;

    return(
        <Link to={topic._id} state={{backgroundLocation:location}}>
            <div className="topicItem">
                <div className="topicImg">
                    <img src={topicUrl} onError={()=>setTopicUrl(defaultTopicUrl)}/>
                </div>
                <div className="topicTitle">
                    {topic.title} ({topic.conversationCount})
                </div>
            </div>
        </Link>
        
    )
}

export default TopicItem;