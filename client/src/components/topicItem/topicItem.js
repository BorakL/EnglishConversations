import {Link, useLocation} from "react-router-dom"
import "./topicItem.scss"

const TopicItem = ({topic})=>{
const location = useLocation();

const host = "http://localhost:3001/img/topics"


    return(
        <Link to={topic._id} state={{backgroundLocation:location}}>
            <div className="topicItem">
                <div className="topicImg">
                    <img src={`${host}/${topic.title}.jpg`}/>           
                </div>
                <div className="topicTitle">
                    {topic.title}
                </div>
            </div>
        </Link>
        
    )
}

export default TopicItem;