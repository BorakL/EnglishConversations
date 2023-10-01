import {combineReducers} from "redux";
import conversations from "./conversations";
import topics from "./topics";

export default combineReducers({
    conversations,
    topics
})