import {Link} from "react-router-dom"

const TopicItem = ({topic})=>{

    return(
        <Link to={topic._id}>
            <div className="topicItem">
                <div className="topicImg">
                    <img src={topic.image}/>           
                </div>
                <div className="topicTitle">
                    {topic.title}
                </div>
            </div>
        </Link>
        
    )
}

export default TopicItem;