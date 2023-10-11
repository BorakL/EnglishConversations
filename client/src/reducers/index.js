import {combineReducers} from "redux";
import conversations from "./conversations";
import topics from "./topics";
import app from "./app";

export default combineReducers({
    conversations,
    topics,
    app
})