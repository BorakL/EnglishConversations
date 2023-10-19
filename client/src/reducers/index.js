import {combineReducers} from "redux";
import conversations from "./conversations";
import topics from "./topics";
import app from "./app";
import test from "./test";

export default combineReducers({
    conversations,
    topics,
    app,
    test
})